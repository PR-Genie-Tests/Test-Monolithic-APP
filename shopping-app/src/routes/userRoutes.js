const express = require('express');
const UserController = require('../controllers/UserController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.post(
    '/register',
    validateBody(['username', 'email', 'passwordHash']),
    UserController.registerUser
);
router.post(
    '/login',
    validateBody(['username', 'password']),
    UserController.loginUser
);

// Protected routes
router.get('/profile', protect, UserController.getUserProfile);

// Admin routes
router.get('/all', protect, admin, UserController.getAllUsers);

module.exports = router;