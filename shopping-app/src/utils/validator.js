/**
 * Basic validation utility for checking required fields.
 * @param {object} data - The object to validate.
 * @param {string[]} requiredFields - Array of field names that must be present.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
const validateRequiredFields = (data, requiredFields) => {
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            return `Missing required field: ${field}`;
        }
    }
    return null;
};

module.exports = {
    validateRequiredFields
};