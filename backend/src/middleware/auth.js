import { verifyToken } from "./../utils/token.js";
import UserModel from "../models/user-model.js";

/**
 * Authentication middleware to verify JWT token
 */
export const auth = async (req, res, next) => {
    try {
        // Get token from Authorization header (Bearer token)
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required', status: false });
        }
        
        // Extract token without 'Bearer ' prefix
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format', status: false });
        }
        
        // Verify token and extract user info
        const decoded = verifyToken(token);
        
        // Add user info to request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token', status: false });
    }
};

/**
 * Role-based authorization middleware
 * @param {string[]} roles - Array of allowed roles
 */
export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated', status: false });
        }
        
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions', status: false });
        }
        
        next();
    };
};

/**
 * Admin-only access middleware
 */
export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required', status: false });
    }
    next();
};

/**
 * Extract user info from token without requiring authentication
 */
export const getUserFromToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            if (token) {
                const decoded = verifyToken(token);
                req.user = decoded;
            }
        }
    } catch (err) {
        // Silently fail - this middleware doesn't block the request
        console.log('Token extraction failed:', err.message);
    }
    next();
};