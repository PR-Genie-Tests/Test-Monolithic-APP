const cartData = require('../data/cartData');
const productData = require('../data/productData');

class CartService {
    /**
     * Retrieves the cart contents for a user (placeholder).
     * @param {number} userId
     * @returns {object} Cart details including total.
     */
    static getCart(userId = 1) {
        const items = cartData.getCartByUserId(userId);
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { items, total };
    }

    /**
     * Adds a product to the cart.
     * @param {number} userId
     * @param {number} productId
     * @param {number} quantity
     * @returns {object|null} The updated cart or null if product not found.
     */
    static addToCart(userId = 1, productId, quantity = 1) {
        const product = productData.findProductById(productId);
        if (!product) {
            return null;
        }

        const newItem = {
            productId: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price
        };

        cartData.updateCartItem(userId, newItem);
        return CartService.getCart(userId);
    }

    /**
     * Removes a product from the cart.
     * @param {number} userId
     * @param {number} productId
     * @returns {object} The updated cart.
     */
    static removeFromCart(userId = 1, productId) {
        cartData.removeCartItem(userId, productId);
        return CartService.getCart(userId);
    }

    /**
     * Clears the cart.
     * @param {number} userId
     */
    static clearCart(userId = 1) {
        cartData.clearCart(userId);
    }
}

module.exports = CartService;