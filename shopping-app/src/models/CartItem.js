/**
 * @typedef {object} CartItem
 * @property {number} productId - ID of the product in the cart.
 * @property {number} quantity - Quantity of the product.
 * @property {string} name - Name of the product (denormalized).
 * @property {number} price - Price of the product (denormalized).
 */

class CartItem {
    /**
     * @param {CartItem} itemData
     */
    constructor(itemData) {
        this.productId = itemData.productId;
        this.quantity = itemData.quantity;
        this.name = itemData.name;
        this.price = itemData.price;
    }
}

module.exports = CartItem;