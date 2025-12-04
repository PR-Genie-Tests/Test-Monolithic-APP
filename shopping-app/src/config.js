const config = {
    PORT: process.env.PORT || 3001,
    API_VERSION: 'v1',
    BASE_URL: '/api',
    // In a real application, these would be loaded from environment variables
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_NAME: 'shopping_db',
    JWT_SECRET: 'super-secret-key-for-development',
    LOG_LEVEL: 'info'
};

module.exports = config;