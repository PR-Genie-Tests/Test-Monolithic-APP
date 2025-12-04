const { errorResponse } = require('../utils/responseHandler');

/**
 * Custom error handler middleware.
 * @param {Error} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';

    errorResponse(res, statusCode, message);
};

module.exports = errorHandler;