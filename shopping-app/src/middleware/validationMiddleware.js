const { validateRequiredFields } = require('../utils/validator');
const { errorResponse } = require('../utils/responseHandler');

/**
 * Middleware factory to validate required fields in the request body.
 * @param {string[]} requiredFields - Array of field names that must be present.
 * @returns {Function} Express middleware function.
 */
const validateBody = (requiredFields) => (req, res, next) => {
    const error = validateRequiredFields(req.body, requiredFields);
    if (error) {
        return errorResponse(res, 400, error);
    }
    next();
};

module.exports = { validateBody };