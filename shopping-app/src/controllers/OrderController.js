const OrderService = require('../services/OrderService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

class OrderController {
    static createOrder = asyncHandler(async (req, res) => {
        // Placeholder userId 1 until auth is fully implemented
        const userId = req.user ? req.user.id : 1;

        const newOrder = OrderService.checkout(userId);

        if (!newOrder) {
            return errorResponse(res, 400, 'Cannot create order: Cart is empty');
        }

        successResponse(res, 201, 'Order placed successfully', newOrder);
    });

    static getMyOrders = asyncHandler(async (req, res) => {
        // Placeholder userId 1 until auth is fully implemented
        const userId = req.user ? req.user.id : 1;

        const orders = OrderService.getOrdersByUserId(userId);
        successResponse(res, 200, 'User orders retrieved successfully', orders);
    });

    static getOrderById = asyncHandler(async (req, res) => {
        const orderId = parseInt(req.params.id);
        const order = OrderService.getOrderById(orderId);

        if (!order) {
            return errorResponse(res, 404, `Order with ID ${orderId} not found`);
        }

        // Basic authorization check (user can only see their own orders, unless admin)
        const userId = req.user ? req.user.id : 1;
        const userRole = req.user ? req.user.role : 'customer';

        if (order.userId !== userId && userRole !== 'admin') {
            return errorResponse(res, 403, 'Not authorized to view this order');
        }

        successResponse(res, 200, 'Order retrieved successfully', order);
    });

    static getAllOrders = asyncHandler(async (req, res) => {
        // This endpoint should be protected by admin middleware
        const orders = OrderService.getAllOrders();
        successResponse(res, 200, 'All orders retrieved successfully', orders);
    });
}

module.exports = OrderController;