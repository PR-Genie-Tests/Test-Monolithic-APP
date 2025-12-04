const UserService = require('../services/UserService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

class UserController {
    static registerUser = asyncHandler(async (req, res) => {
        const { username, email, passwordHash } = req.body;

        // Basic check, more robust validation is needed in a real app
        if (!username || !email || !passwordHash) {
            return errorResponse(res, 400, 'Please provide username, email, and password');
        }

        // Check if user already exists (simplified)
        if (UserService.loginUser(username, `hashed_${username}_password`)) {
            return errorResponse(res, 409, 'User already exists');
        }

        const newUser = UserService.registerUser({ username, email, passwordHash });
        successResponse(res, 201, 'User registered successfully', newUser);
    });

    static loginUser = asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return errorResponse(res, 400, 'Please provide username and password');
        }

        // Note: We are using a simplified password check in UserService
        const user = UserService.loginUser(username, password);

        if (!user) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        successResponse(res, 200, 'Login successful', user);
    });

    static getUserProfile = asyncHandler(async (req, res) => {
        // req.user is set by authMiddleware.protect
        const user = req.user;
        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }
        successResponse(res, 200, 'User profile retrieved', user);
    });

    static getAllUsers = asyncHandler(async (req, res) => {
        const users = UserService.getAllUsers();
        successResponse(res, 200, 'Users retrieved successfully', users);
    });
}

module.exports = UserController;