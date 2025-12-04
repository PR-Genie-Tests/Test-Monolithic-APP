const API_BASE_URL = 'http://localhost:3001/api/v1';
const productListElement = document.getElementById('product-list');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const productsSection = document.getElementById('products');
const cartSection = document.getElementById('cart');

let cart = [];
let authToken = null; // Mock authentication token storage

// --- Utility Functions ---

function formatPrice(price) {
    return price.toFixed(2);
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = count;
}

// --- API Interaction ---

async function fetchProducts() {
    try {
        console.log(`Fetching products from: ${API_BASE_URL}/products`);
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        renderProducts(products.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        productListElement.innerHTML = '<p>Failed to load products. Please ensure the backend server is running on port 3001.</p>';
    }
}

// Mock Login function (since we don't have a full login form)
async function mockLogin() {
    console.log("Attempting mock login...");
    try {
        // Assuming a simple login endpoint exists for a test user
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'testuser', password: 'password123' }) // Changed email to username
        });

        if (response.ok) {
            const data = await response.json();
            // Assuming the backend returns a token in data.token
            authToken = data.token || 'mock-jwt-token'; 
            localStorage.setItem('authToken', authToken);
            console.log("Mock login successful. Token stored.");
        } else {
            console.warn("Mock login failed. Using mock token.");
            authToken = 'mock-jwt-token';
        }
    } catch (error) {
        console.error("Error during mock login:", error);
        authToken = 'mock-jwt-token';
    }
}

// --- Rendering Functions ---

function renderProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${formatPrice(product.price)}</p>
        <p>Stock: ${product.stock}</p>
        <button data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    `;
    return card;
}

function renderProducts(products) {
    productListElement.innerHTML = '';
    products.forEach(product => {
        productListElement.appendChild(renderProductCard(product));
    });
}

function renderCartItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
        <div class="item-details">
            <h4>${item.name}</h4>
            <p>$${formatPrice(item.price)} x ${item.quantity}</p>
        </div>
        <div class="item-quantity">
            <button class="remove-one-btn" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="add-one-btn" data-id="${item.id}">+</button>
        </div>
    `;
    return itemDiv;
}

function renderCart() {
    cartItemsElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            cartItemsElement.appendChild(renderCartItem(item));
            total += item.price * item.quantity;
        });
    }

    cartTotalElement.textContent = formatPrice(total);
    updateCartCount();
    saveCart();
}

// --- Cart Logic ---

function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name, price: parseFloat(price), quantity: 1 });
    }
    renderCart();
}

function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
        }
        renderCart();
    }
}

// --- Event Handlers ---

function handleProductClick(event) {
    const button = event.target.closest('button');
    if (button && button.dataset.id) {
        const { id, name, price } = button.dataset;
        addToCart(id, name, price);
    }
}

function handleCartClick(event) {
    const target = event.target;
    const productId = target.dataset.id;

    if (target.classList.contains('add-one-btn')) {
        updateQuantity(productId, 1);
    } else if (target.classList.contains('remove-one-btn')) {
        updateQuantity(productId, -1);
    }
}

function handleNavigation(event) {
    const target = event.target.closest('a');
    if (target && target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const sectionId = target.getAttribute('href').substring(1);

        productsSection.classList.add('hidden');
        cartSection.classList.add('hidden');

        if (sectionId === 'products') {
            productsSection.classList.remove('hidden');
        } else if (sectionId === 'cart') {
            cartSection.classList.remove('hidden');
        }
    }
}

async function handleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!authToken) {
        alert("Please log in to checkout. (Mock login failed or not implemented fully)");
        return;
    }

    // Prepare cart items for the backend
    const orderItems = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }));

    try {
        // Note: The backend structure suggests a separate /orders route for creation.
        // We are skipping the /cart interaction for simplicity and going straight to order creation.
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ items: orderItems })
        });

        if (response.ok) {
            const order = await response.json();
            alert(`Order placed successfully! Order ID: ${order.data.id}. Total: $${cartTotalElement.textContent}`);
            cart = []; // Clear local cart
            renderCart();
            // Switch back to products view
            productsSection.classList.remove('hidden');
            cartSection.classList.add('hidden');
        } else {
            const errorData = await response.json();
            alert(`Checkout failed: ${errorData.message || 'Server error'}`);
            console.error('Checkout error:', errorData);
        }
    } catch (error) {
        console.error('Network error during checkout:', error);
        alert('An error occurred during checkout. Check console for details.');
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load existing cart data
    loadCart();

    // 2. Fetch and display products
    fetchProducts();

    // 3. Mock login to get a token for checkout (if needed)
    mockLogin();

    // 4. Setup event listeners
    productListElement.addEventListener('click', handleProductClick);
    cartItemsElement.addEventListener('click', handleCartClick);
    document.querySelector('nav').addEventListener('click', handleNavigation);
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
});