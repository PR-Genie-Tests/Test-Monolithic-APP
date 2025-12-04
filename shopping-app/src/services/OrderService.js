const orderData = require('../data/orderData');
const cartData = require('../data/cartData');
const productData = require('../data/productData');
const { getCurrentTimestamp } = require('../utils/dateUtils');

class OrderService {
    /**
     * Retrieves all orders (Admin only).
     * @returns {Order[]}
     */
    static getAllOrders() {
        return orderData.getAllOrders();
    }

    /**
     * Retrieves orders for a specific user.
     * @param {number} userId
     * @returns {Order[]}
     */
    static getOrdersByUserId(userId) {
        return orderData.findOrdersByUserId(userId);
    }

    /**
     * Retrieves a single order by ID.
     * @param {number} orderId
     * @returns {Order|null}
     */
    static getOrderById(orderId) {
        return orderData.findOrderById(orderId);
    }

    /**
     * Processes checkout and creates a new order from the cart.
     * @param {number} userId
     * @returns {Order|null} The created order or null if cart is empty.
     */
    static checkout(userId = 1) {
        const cartItems = cartData.getCartByUserId(userId);

        if (cartItems.length === 0) {
            return null;
        }

        // Prepare order items and calculate total
        const orderItems = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price // Use current price as price at purchase
        }));

        const totalAmount = orderItems.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);

        const orderDetails = {
            userId,
            items: orderItems,
            totalAmount,
            status: 'pending',
            orderDate: getCurrentTimestamp()
        };

        const newOrder = orderData.createOrder(orderDetails);

        // Clear the cart after successful order creation
        cartData.clearCart(userId);

        return newOrder;
    }
}

module.exports = OrderService;