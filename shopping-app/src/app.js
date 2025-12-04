const express = require('express');
const cors = require('cors');
const config = require('./config');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorHandler');
const { errorResponse } = require('./utils/responseHandler');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

module.exports = () => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(loggerMiddleware);

    // Define API base path
    const API_BASE = `${config.BASE_URL}/${config.API_VERSION}`;

    // Root route
    app.get('/', (req, res) => {
        res.send(`Shopping App API ${config.API_VERSION} is running!`);
    });

    // Route mounting
    app.use(`${API_BASE}/products`, productRoutes);
    app.use(`${API_BASE}/cart`, cartRoutes);
    app.use(`${API_BASE}/users`, userRoutes);
    app.use(`${API_BASE}/orders`, orderRoutes);

    // 404 Not Found Handler
    app.use((req, res, next) => {
        errorResponse(res, 404, `Not Found - ${req.originalUrl}`);
    });

    // Custom Error Handler (must be last middleware)
    app.use(errorHandler);

    return app;
};