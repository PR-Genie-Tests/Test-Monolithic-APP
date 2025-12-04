const userData = require('../data/userData');
const User = require('../models/User');

class UserService {
    /**
     * Retrieves all users.
     * @returns {User[]}
     */
    static getAllUsers() {
        return userData.getAllUsers().map(user => {
            // Exclude sensitive data like password hash
            const { passwordHash, ...safeUser } = user;
            return safeUser;
        });
    }

    /**
     * Retrieves a user by ID.
     * @param {number} id
     * @returns {object|null} Safe user object or null.
     */
    static getUserById(id) {
        const user = userData.findUserById(id);
        if (user) {
            const { passwordHash, ...safeUser } = user;
            return safeUser;
        }
        return null;
    }

    /**
     * Creates a new user.
     * @param {object} userDetails - Must include username, email, and passwordHash.
     * @returns {object} Safe user object.
     */
    static registerUser(userDetails) {
        // In a real app, we would hash the password here
        const newUser = userData.addUser(userDetails);
        const { passwordHash, ...safeUser } = newUser;
        return safeUser;
    }

    /**
     * Placeholder for user login/authentication.
     * @param {string} username
     * @param {string} password
     * @returns {object|null} Safe user object with a token placeholder, or null.
     */
    static loginUser(username, password) {
        const user = userData.findUserByUsername(username);
        // Placeholder for password verification:
        if (user && user.passwordHash === `hashed_${username}_password`) {
            const { passwordHash, ...safeUser } = user;
            return { ...safeUser, token: 'fake-jwt-token-12345' };
        }
        return null;
    }
}

module.exports = UserService;