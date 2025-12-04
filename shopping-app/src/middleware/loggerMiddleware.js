const { getCurrentTimestamp } = require('../utils/dateUtils');

/**
 * Simple request logger middleware.
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const loggerMiddleware = (req, res, next) => {
    const timestamp = getCurrentTimestamp();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;