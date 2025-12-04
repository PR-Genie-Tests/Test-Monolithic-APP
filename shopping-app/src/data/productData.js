const Product = require('../models/Product');

const initialProducts = [
    new Product({ id: 1, name: 'Laptop Pro', price: 1200, description: 'Powerful computing on the go.', category: 'Electronics', stock: 50 }),
    new Product({ id: 2, name: 'Smartphone X', price: 800, description: 'Next-generation mobile device.', category: 'Electronics', stock: 120 }),
    new Product({ id: 3, name: 'Headphones ANC', price: 150, description: 'Noise-cancelling over-ear headphones.', category: 'Accessories', stock: 200 }),
    new Product({ id: 4, name: 'Mechanical Keyboard', price: 75, description: 'Mechanical keyboard with RGB.', category: 'Accessories', stock: 80 }),
    new Product({ id: 5, name: '4K Monitor', price: 450, description: 'Ultra HD display for professionals.', category: 'Electronics', stock: 30 }),
    new Product({ id: 6, name: 'Gaming Mouse', price: 50, description: 'High precision gaming mouse.', category: 'Accessories', stock: 150 }),
    new Product({ id: 7, name: 'Webcam HD', price: 60, description: 'Full HD streaming webcam.', category: 'Accessories', stock: 90 }),
    new Product({ id: 8, name: 'External SSD 1TB', price: 100, description: 'Fast external storage.', category: 'Storage', stock: 70 }),
    new Product({ id: 9, name: 'Smart Watch', price: 250, description: 'Track your fitness and notifications.', category: 'Wearables', stock: 110 }),
    new Product({ id: 10, name: 'Tablet 10"', price: 350, description: 'Portable entertainment device.', category: 'Electronics', stock: 60 }),
];

let products = [...initialProducts];

/**
 * Finds a product by ID.
 * @param {number} id
 * @returns {Product|undefined}
 */
const findProductById = (id) => products.find(p => p.id === id);

/**
 * Gets all products.
 * @returns {Product[]}
 */
const getAllProducts = () => products;

/**
 * Adds a new product.
 * @param {Product} product
 */
const addProduct = (product) => {
    products.push(product);
};

/**
 * Updates an existing product.
 * @param {number} id
 * @param {object} updates
 * @returns {Product|null}
 */
const updateProduct = (id, updates) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        return products[index];
    }
    return null;
};

/**
 * Deletes a product by ID.
 * @param {number} id
 * @returns {boolean} True if deleted, false otherwise.
 */
const deleteProduct = (id) => {
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    return products.length !== initialLength;
};

module.exports = {
    findProductById,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};