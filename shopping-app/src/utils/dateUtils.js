/**
 * Gets the current timestamp in ISO format.
 * @returns {string} ISO 8601 timestamp.
 */
const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

/**
 * Formats a date object into a simple date string (YYYY-MM-DD).
 * @param {Date} date - The date object.
 * @returns {string} Formatted date string.
 */
const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

module.exports = {
    getCurrentTimestamp,
    formatDate
};