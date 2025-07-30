import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";

import { connectDB } from "./src/config/db/db-connection.js";
import { applyGlobalMiddleware } from "./src/middleware/global-middleware.js";
import { Error404 } from "./src/middleware/error.js";
import dotenv from "dotenv";
import { indexRoute } from "./src/api/v1/routes/index.js";
const app = express();
const server = createServer(app);
dotenv.config();


applyGlobalMiddleware(app);
app.use('/api/v1', indexRoute);

// app.use("./src/api/v1", indexRoute);

app.use(Error404)


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
