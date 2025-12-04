/**
 * @typedef {object} OrderItem
 * @property {number} productId
 * @property {number} quantity
 * @property {number} priceAtPurchase
 */

/**
 * @typedef {object} Order
 * @property {number} id - Unique identifier for the order.
 * @property {number} userId - ID of the user who placed the order.
 * @property {OrderItem[]} items - Array of items purchased.
 * @property {number} totalAmount - Total cost of the order.
 * @property {string} status - Current status (e.g., 'pending', 'shipped', 'delivered').
 * @property {string} orderDate - ISO timestamp of when the order was placed.
 */

class Order {
    /**
     * @param {Order} orderData
     */
    constructor(orderData) {
        this.id = orderData.id;
        this.userId = orderData.userId;
        this.items = orderData.items;
        this.totalAmount = orderData.totalAmount;
        this.status = orderData.status || 'pending';
        this.orderDate = orderData.orderDate || new Date().toISOString();
    }
}

module.exports = Order;