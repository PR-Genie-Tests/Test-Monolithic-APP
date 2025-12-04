const CartItem = require('../models/CartItem');

// Cart is stored per user, but since we don't have proper sessions/auth yet,
// we'll use a simple global cart for demonstration, keyed by a placeholder userId (1).
const carts = {
    1: [] // Array of CartItem objects
};

/**
 * Gets the cart for a specific user (placeholder).
 * @param {number} userId
 * @returns {CartItem[]}
 */
const getCartByUserId = (userId = 1) => carts[userId] || [];

/**
 * Adds or updates an item in the cart.
 * @param {number} userId
 * @param {CartItem} newItem
 * @returns {CartItem[]} The updated cart.
 */
const updateCartItem = (userId = 1, newItem) => {
    const cart = carts[userId] || [];
    const existingIndex = cart.findIndex(item => item.productId === newItem.productId);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += newItem.quantity;
    } else {
        cart.push(new CartItem(newItem));
    }
    carts[userId] = cart;
    return cart;
};

/**
 * Removes an item from the cart.
 * @param {number} userId
 * @param {number} productId
 * @returns {CartItem[]} The updated cart.
 */
const removeCartItem = (userId = 1, productId) => {
    let cart = carts[userId] || [];
    cart = cart.filter(item => item.productId !== productId);
    carts[userId] = cart;
    return cart;
};

/**
 * Clears the cart after checkout.
 * @param {number} userId
 */
const clearCart = (userId = 1) => {
    carts[userId] = [];
};

module.exports = {
    getCartByUserId,
    updateCartItem,
    removeCartItem,
    clearCart
};