import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";
import { connectDB } from "./src/config/db/db-connection.js";
import { Error404, errorHandler } from "./src/middleware/error.js";
import dotenv from "dotenv";
import { indexRoute } from "./src/api/v1/routes/index.js";





const app = express();
const server = createServer(app);
dotenv.config();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));                    // CORS for cross-origin requests
app.use(express.json());            // Parse JSON request bodies
app.use('/api/v1', indexRoute);

// Error handling middleware
app.use(Error404);
app.use(errorHandler);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3003;
  server.listen(PORT, () => {
    console.log(
      chalk.blueBright(
        `🚀 Gyanito Backend Server running at http://localhost:${PORT}`
      )
    );
  });
};

startServer();
