const ProductService = require('../services/ProductService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

class ProductController {
    static getAllProducts = asyncHandler(async (req, res) => {
        const products = ProductService.getAllProducts();
        successResponse(res, 200, 'Products retrieved successfully', products);
    });

    static getProductById = asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const product = ProductService.getProductById(id);

        if (!product) {
            return errorResponse(res, 404, `Product with ID ${id} not found`);
        }

        successResponse(res, 200, 'Product retrieved successfully', product);
    });

    static createProduct = asyncHandler(async (req, res) => {
        const newProduct = ProductService.createProduct(req.body);
        successResponse(res, 201, 'Product created successfully', newProduct);
    });

    static updateProduct = asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const updatedProduct = ProductService.updateProduct(id, req.body);

        if (!updatedProduct) {
            return errorResponse(res, 404, `Product with ID ${id} not found`);
        }

        successResponse(res, 200, 'Product updated successfully', updatedProduct);
    });

    static deleteProduct = asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const deleted = ProductService.deleteProduct(id);

        if (!deleted) {
            return errorResponse(res, 404, `Product with ID ${id} not found`);
        }

        successResponse(res, 200, 'Product deleted successfully');
    });
}

module.exports = ProductController;