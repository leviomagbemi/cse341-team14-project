const express = require('express');
const router = express.Router();

// Import the sub-routers for each collection and auth
const shirtRouter = require('./shirts');
const orderRouter = require('./orders');
const categoryRouter = require('./categories');
const supplierRouter = require('./suppliers');
// const authRouter = require('./auth'); // For login/logout

// 1. Documentation Route (Swagger)
router.use('/', require('./swagger'));

// 2. Authentication Routes
// router.use('/auth', authRouter);

// 3. Collection Routes
router.use('/shirts', /* #swagger.tags = ['Shirts'] */ shirtRouter);
router.use('/orders', /* #swagger.tags = ['Orders'] */ orderRouter);
router.use('/categories', /* #swagger.tags = ['Categories'] */ categoryRouter);
router.use('/suppliers', /* #swagger.tags = ['Suppliers'] */ supplierRouter);

// Root route
router.get('/', (req, res) => {
    res.send('Logged out');
});

module.exports = router;