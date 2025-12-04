const express = require('express');
const OrderController = require('../controllers/OrderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (User orders)
router.get('/my', protect, OrderController.getMyOrders);
router.get('/:id', protect, OrderController.getOrderById);

// Admin routes (All orders)
router.get('/', protect, admin, OrderController.getAllOrders);

module.exports = router;