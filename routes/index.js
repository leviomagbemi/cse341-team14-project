const express = require('express');
const router = express.Router();

// Import the sub-routers for each collection and auth
const shirtRouter = require('./shirts');
// const orderRouter = require('./orders');
// const categoryRouter = require('./categories');
// const supplierRouter = require('./suppliers');
// const authRouter = require('./auth'); // For login/logout

// 1. Documentation Route (Swagger)
router.use('/', require('./swagger'));

// 2. Authentication Routes
// router.use('/auth', authRouter);

// 3. Collection Routes
router.use('/shirts', shirtRouter);
// router.use('/orders', orderRouter);
// router.use('/categories', categoryRouter);
// router.use('/suppliers', supplierRouter);

// Root route to show API documentation link
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Sleeve & Stitch Men\'s Shirt API',
        documentation: '/api-docs',
        version: '1.0.0'
    });
});

module.exports = router;