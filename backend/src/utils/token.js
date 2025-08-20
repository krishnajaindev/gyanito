import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'cognito_secure_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate a JWT token with user information
 * @param {string} email - User email
 * @param {string} role - User role (admin, user, etc.)
 * @returns {string} JWT token
 */
export const generateToken = (email, role) => {
    const token = jwt.sign(
        { email, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    return token;
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}