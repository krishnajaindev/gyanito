// server.js

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // Re-added: Security headers
import compression from "compression"; // Re-added: Gzip compression
import cookieParser from "cookie-parser"; // Re-added: Cookie parsing
import morgan from "morgan"; // Re-added: HTTP request logging
import rateLimit from "express-rate-limit"; // Re-added: Rate limiting

// Import your custom DB connection function and Error middleware
import { connectDB } from "./src/config/db/db-connection.js";
import { Error404 } from "./src/middleware/error.js"; // Assuming this is your 404/catch-all error handler
import { indexRoute } from "./src/api/v1/routes/index.js"; // Your main API router

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();
// Create a standard Node.js HTTP server and attach the Express app to it.
const server = createServer(app);

// --- GLOBAL MIDDLEWARE ---
// Middleware functions are executed in the order they are defined.

// Enable Cross-Origin Resource Sharing (CORS) for all requests.
// This should generally be one of the first middleware to handle preflight requests.
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Use env var for frontend URL in production
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow common methods
  credentials: true // Allow cookies to be sent with cross-origin requests
}));

// Apply security headers to responses using Helmet.
app.use(helmet());

// Compress all outgoing responses with Gzip.
app.use(compression());

// Parse incoming JSON payloads from request bodies.
app.use(express.json());

// Parse Cookie header and populate `req.cookies`.
app.use(cookieParser());

// HTTP request logger middleware for Node.js.
app.use(morgan("dev"));

// Apply rate limiting to all requests.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    // Optional: headers: true // Add X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers
  })
);


// --- HEALTH CHECK ENDPOINT ---
// This endpoint is specifically for monitoring services (like UptimeRobot)
// to check if the server is alive and responsive.
// It should be placed BEFORE your main API routes.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Gyanito Backend is healthy and running!",
    uptime: process.uptime(), // How long the server has been running
    timestamp: new Date().toISOString(),
  });
});

// --- API ROUTES ---
// Mount your main API routes under the /api/v1 path.
app.use('/api/v1', indexRoute);

// --- ERROR HANDLING MIDDLEWARE ---
// This middleware should be the LAST one to catch any requests
// that haven't been handled by previous routes or middleware.
// It acts as a catch-all for 404 Not Found errors and other unhandled errors.
app.use(Error404);


// --- SOCKET.IO INITIALIZATION ---
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*", // Use env var for frontend URL in production
    methods: ["GET", "POST"], // Only allow GET/POST for Socket.IO handshake
    credentials: true // Allow cookies to be sent with cross-origin Socket.IO requests
  },
  // Optional: Add pingInterval and pingTimeout for more robust connection management
  // pingInterval: 25000, // Client sends a ping every 25 seconds
  // pingTimeout: 20000,  // Server waits 20 seconds for a pong response
});

// --- DATABASE CONNECTION & SERVER START ---
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log(chalk.green("✅ MongoDB connected successfully!"));

    const PORT = process.env.PORT || 3003; // Use 3003 as a common dev port
    server.listen(PORT, () => {
      console.log(chalk.blueBright(`🚀 Gyanito Backend Server running on http://localhost:${PORT}`));
      console.log(chalk.cyanBright(`💡 Access Health Check at http://localhost:${PORT}/health`));
      console.log(chalk.cyanBright(`💡 Access API at http://localhost:${PORT}/api/v1/`));
    });

  } catch (err) {
    console.error(chalk.red("❌ Failed to start server due to database connection error:"), err);
    // Exit the process if DB connection fails at startup
    process.exit(1);
  }
};

startServer();

// --- SOCKET.IO EVENT HANDLING ---
// Listen for new Socket.IO client connections.
io.on("connection", (socket) => {
  console.log(chalk.blueBright(`🟢 New client connected: ${socket.id}`));

  // Listen for client disconnections.
  socket.on("disconnect", () => {
    console.log(chalk.magentaBright(`🔴 Client disconnected: ${socket.id}`));
  });

  // --- Add more Socket.IO event listeners here for quiz-specific logic ---
  // Example: Listen for a 'joinQuiz' event from a client
  // socket.on('joinQuiz', (quizId) => {
  //   socket.join(quizId); // Add the socket to a specific room for that quiz
  //   console.log(`Client ${socket.id} joined quiz room: ${quizId}`);
  //   // io.to(quizId).emit('quizUpdate', 'A new player joined!'); // Notify others in the room
  // });

  // Example: Listen for a 'submitAnswer' event
  // socket.on('submitAnswer', (data) => {
  //   // Process the answer, calculate score, and emit updates
  //   console.log(`Answer submitted by ${socket.id} for quiz ${data.quizId}: ${data.answer}`);
  //   // socket.emit('yourScore', { score: 10 }); // Send score back to individual client
  //   // io.to(data.quizId).emit('leaderboardUpdate', { updatedLeaderboard: [...] }); // Update leaderboard for all in room
  // });
});

// Optional: Graceful shutdown for production
process.on('SIGTERM', () => {
  console.log(chalk.yellow('SIGTERM signal received: closing HTTP server'));
  server.close(() => {
    console.log(chalk.yellow('HTTP server closed.'));
    mongoose.connection.close(() => {
      console.log(chalk.yellow('MongoDB connection closed.'));
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('SIGINT signal received: closing HTTP server'));
  server.close(() => {
    console.log(chalk.yellow('HTTP server closed.'));
    mongoose.connection.close(() => {
      console.log(chalk.yellow('MongoDB connection closed.'));
      process.exit(0);
    });
  });
});