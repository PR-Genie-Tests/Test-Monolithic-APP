let currentId = 1000;

/**
 * Generates a unique ID for new entities.
 * @returns {number} The next unique ID.
 */
function generateId() {
    return currentId++;
}

module.exports = {
    generateId
};