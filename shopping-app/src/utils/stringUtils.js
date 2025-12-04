/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string to camelCase.
 * @param {string} str - The input string.
 * @returns {string} The camelCased string.
 */
const toCamelCase = (str) => {
    return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
};

module.exports = {
    capitalize,
    toCamelCase
};