import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";


export const applyGlobalMiddleware = (app) => {
  app.use(cors());                     // CORS for cross-origin requests
  app.use(express.json());            // Parse JSON request bodies
  app.use(helmet());                  // Secure HTTP headers
  app.use(compression());            // Gzip compression
  app.use(cookieParser());            // Parse cookies
  app.use(morgan("dev"));  
                        
};
