// server.js

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

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
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
  })
);

// --- HEALTH CHECK ENDPOINT ---
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Gyanito Backend is healthy and running!",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// --- ADDED: ROOT PATH HANDLER ---
// This route will handle requests to the base URL (e.g., https://gyanito-w88f.onrender.com/)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Gyanito Backend API!",
    healthCheck: "/health",
    apiVersion: "/api/v1",
  });
});

// --- API ROUTES ---
app.use('/api/v1', indexRoute);

// --- ERROR HANDLING MIDDLEWARE ---
app.use(Error404); // This should be the very last middleware


// --- SOCKET.IO INITIALIZATION ---
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  },
});

// --- DATABASE CONNECTION & SERVER START ---
const startServer = async () => {
  try {
    await connectDB();
    console.log(chalk.green("✅ MongoDB connected successfully!"));

    const PORT = process.env.PORT || 3003;
    server.listen(PORT, () => {
      console.log(chalk.blueBright(`🚀 Gyanito Backend Server running on http://localhost:${PORT}`));
      console.log(chalk.cyanBright(`💡 Access Health Check at http://localhost:${PORT}/health`));
      console.log(chalk.cyanBright(`💡 Access API at http://localhost:${PORT}/api/v1/`));
    });

  } catch (err) {
    console.error(chalk.red("❌ Failed to start server due to database connection error:"), err);
    process.exit(1);
  }
};

startServer();

// --- SOCKET.IO EVENT HANDLING ---
io.on("connection", (socket) => {
  console.log(chalk.blueBright(`🟢 New client connected: ${socket.id}`));
  socket.on("disconnect", () => {
    console.log(chalk.magentaBright(`🔴 Client disconnected: ${socket.id}`));
  });
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