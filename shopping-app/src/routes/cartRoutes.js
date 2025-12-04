const express = require('express');
const CartController = require('../controllers/CartController');
const OrderController = require('../controllers/OrderController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');

const router = express.Router();

// All cart operations require authentication (protect middleware)
router.use(protect);

// GET /api/cart
router.get('/', CartController.getCart);

// POST /api/cart - Add item to cart
router.post(
    '/',
    validateBody(['productId']),
    CartController.addToCart
);

// DELETE /api/cart/:productId - Remove item from cart
router.delete('/:productId', CartController.removeFromCart);

// POST /api/cart/checkout - Checkout and create order
router.post('/checkout', OrderController.createOrder);

module.exports = router;