const express = require('express');
const ProductController = require('../controllers/ProductController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Admin routes (require authentication and admin role)
router.post(
    '/',
    protect,
    admin,
    validateBody(['name', 'price', 'description', 'stock']),
    ProductController.createProduct
);
router.put(
    '/:id',
    protect,
    admin,
    ProductController.updateProduct
);
router.delete(
    '/:id',
    protect,
    admin,
    ProductController.deleteProduct
);

module.exports = router;