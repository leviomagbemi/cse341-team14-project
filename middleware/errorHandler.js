const AppError = require('../errors/AppErrors');

/**
 * Global error handling middleware
 * This middleware catches all errors thrown or passed to next() in the application
 * Must be the LAST middleware registered in the app
 */
const errorHandler = (err, req, res, next) => {
    // Set default error values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'Internal Server Error';

    // Return consistent error response
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
