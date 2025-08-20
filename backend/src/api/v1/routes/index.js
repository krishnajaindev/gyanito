import express from 'express';
import userRoutes from "./user-routes.js";
import quizRoutes from "./quiz-routes.js";
import adminRoutes from "./admin-routes.js";
import protectedUserRoutes from "./protected-user-routes.js";
import { getUserFromToken } from '../../../middleware/auth.js';

export const indexRoute = express.Router();

// Apply token extraction middleware to all routes (doesn't block requests)
indexRoute.use(getUserFromToken);

// Public routes
indexRoute.use('/user', userRoutes);
indexRoute.use('/quiz', quizRoutes);

// Protected routes
indexRoute.use('/admin', adminRoutes);
indexRoute.use('/protected', protectedUserRoutes);
