const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Dynamically override host and schemes based on the environment
swaggerDocument.host = process.env.APP_BASE_URL || 'localhost:8080';
swaggerDocument.schemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http', 'https'];

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;