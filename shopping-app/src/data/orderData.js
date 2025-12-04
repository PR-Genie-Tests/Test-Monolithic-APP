const Order = require('../models/Order');
const { generateId } = require('../utils/idGenerator');

const orders = [];

/**
 * Finds an order by ID.
 * @param {number} id
 * @returns {Order|undefined}
 */
const findOrderById = (id) => orders.find(o => o.id === id);

/**
 * Finds orders by user ID.
 * @param {number} userId
 * @returns {Order[]}
 */
const findOrdersByUserId = (userId) => orders.filter(o => o.userId === userId);

/**
 * Gets all orders.
 * @returns {Order[]}
 */
const getAllOrders = () => orders;

/**
 * Creates a new order.
 * @param {object} orderData
 * @returns {Order}
 */
const createOrder = (orderData) => {
    const newOrder = new Order({ id: generateId(), ...orderData });
    orders.push(newOrder);
    return newOrder;
};

module.exports = {
    findOrderById,
    findOrdersByUserId,
    getAllOrders,
    createOrder
};