/**
 * @typedef {object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} username - User's unique username.
 * @property {string} email - User's email address.
 * @property {string} passwordHash - Hashed password (for security).
 * @property {string} role - User role (e.g., 'customer', 'admin').
 * @property {string} createdAt - ISO timestamp of creation.
 */

class User {
    /**
     * @param {User} userData
     */
    constructor(userData) {
        this.id = userData.id;
        this.username = userData.username;
        this.email = userData.email;
        this.passwordHash = userData.passwordHash;
        this.role = userData.role || 'customer';
        this.createdAt = userData.createdAt || new Date().toISOString();
    }
}

module.exports = User;