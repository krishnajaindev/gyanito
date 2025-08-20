/**
 * Custom error handling middleware
 */

// 404 Not Found middleware
export const Error404 = (req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'Resource not found',
        statusCode: 404,
        path: req.originalUrl
    });
};

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    console.error(`Error: ${message}`);
    console.error(err.stack);
    
    res.status(statusCode).json({
        status: false,
        message,
        statusCode,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Custom error class for API errors
export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        Error.captureStackTrace(this, this.constructor);
    }
    
    static badRequest(message) {
        return new ApiError(message || 'Bad Request', 400);
    }
    
    static unauthorized(message) {
        return new ApiError(message || 'Unauthorized', 401);
    }
    
    static forbidden(message) {
        return new ApiError(message || 'Forbidden', 403);
    }
    
    static notFound(message) {
        return new ApiError(message || 'Resource not found', 404);
    }
    
    static serverError(message) {
        return new ApiError(message || 'Internal Server Error', 500);
    }
}