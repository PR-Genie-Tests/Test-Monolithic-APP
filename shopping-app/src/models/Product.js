/**
 * @typedef {object} Product
 * @property {number} id - Unique identifier for the product.
 * @property {string} name - Name of the product.
 * @property {number} price - Price of the product.
 * @property {string} description - Detailed description.
 * @property {string} category - Product category.
 * @property {number} stock - Current stock level.
 */

class Product {
    /**
     * @param {Product} productData
     */
    constructor(productData) {
        this.id = productData.id;
        this.name = productData.name;
        this.price = productData.price;
        this.description = productData.description;
        this.category = productData.category || 'General';
        this.stock = productData.stock || 0;
    }
}

module.exports = Product;