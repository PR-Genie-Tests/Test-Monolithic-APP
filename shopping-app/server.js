const configureApp = require('./src/app');
const config = require('./src/config');

const app = configureApp();
const PORT = config.PORT;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});