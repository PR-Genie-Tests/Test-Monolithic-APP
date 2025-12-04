const productData = require('../data/productData');
const Product = require('../models/Product');
const { generateId } = require('../utils/idGenerator');

class ProductService {
    /**
     * Retrieves all products.
     * @returns {Product[]}
     */
    static getAllProducts() {
        return productData.getAllProducts();
    }

    /**
     * Retrieves a product by ID.
     * @param {number} id
     * @returns {Product|null}
     */
    static getProductById(id) {
        const product = productData.findProductById(id);
        return product || null;
    }

    /**
     * Creates a new product.
     * @param {object} productDetails
     * @returns {Product}
     */
    static createProduct(productDetails) {
        const newProduct = new Product({ id: generateId(), ...productDetails });
        productData.addProduct(newProduct);
        return newProduct;
    }

    /**
     * Updates an existing product.
     * @param {number} id
     * @param {object} updates
     * @returns {Product|null}
     */
    static updateProduct(id, updates) {
        return productData.updateProduct(id, updates);
    }

    /**
     * Deletes a product by ID.
     * @param {number} id
     * @returns {boolean}
     */
    static deleteProduct(id) {
        return productData.deleteProduct(id);
    }
}

module.exports = ProductService;