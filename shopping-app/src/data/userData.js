const User = require('../models/User');
const { generateId } = require('../utils/idGenerator');

const initialUsers = [
    new User({ id: 1, username: 'admin', email: 'admin@shop.com', passwordHash: 'hashed_admin_password', role: 'admin' }),
    new User({ id: 2, username: 'shakir', email: 'shakir@shop.com', passwordHash: 'hashed_shakir_password', role: 'customer' }),
];

let users = [...initialUsers];

/**
 * Finds a user by ID.
 * @param {number} id
 * @returns {User|undefined}
 */
const findUserById = (id) => users.find(u => u.id === id);

/**
 * Finds a user by username.
 * @param {string} username
 * @returns {User|undefined}
 */
const findUserByUsername = (username) => users.find(u => u.username === username);

/**
 * Gets all users.
 * @returns {User[]}
 */
const getAllUsers = () => users;

/**
 * Adds a new user.
 * @param {object} userData
 * @returns {User}
 */
const addUser = (userData) => {
    const newUser = new User({ id: generateId(), ...userData });
    users.push(newUser);
    return newUser;
};

module.exports = {
    findUserById,
    findUserByUsername,
    getAllUsers,
    addUser
};