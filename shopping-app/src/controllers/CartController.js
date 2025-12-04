const CartService = require('../services/CartService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

class CartController {
    static getCart = asyncHandler(async (req, res) => {
        // Placeholder userId 1 until auth is fully implemented
        const cart = CartService.getCart(req.user ? req.user.id : 1);
        successResponse(res, 200, 'Cart retrieved successfully', cart);
    });

    static addToCart = asyncHandler(async (req, res) => {
        const { productId, quantity } = req.body;
        const userId = req.user ? req.user.id : 1;

        if (!productId) {
            return errorResponse(res, 400, 'Missing required field: productId');
        }

        const updatedCart = CartService.addToCart(userId, productId, quantity);

        if (!updatedCart) {
            return errorResponse(res, 404, `Product with ID ${productId} not found`);
        }

        successResponse(res, 201, 'Item added to cart successfully', updatedCart);
    });

    static removeFromCart = asyncHandler(async (req, res) => {
        const productId = parseInt(req.params.productId);
        const userId = req.user ? req.user.id : 1;

        const updatedCart = CartService.removeFromCart(userId, productId);

        // Note: CartService.removeFromCart always returns the updated cart, 
        // so we don't check for existence here, assuming the client handles 
        // the updated cart state.

        successResponse(res, 200, 'Item removed from cart successfully', updatedCart);
    });
}

module.exports = CartController;