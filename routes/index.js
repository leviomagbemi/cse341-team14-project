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
router.use('/shirts', shirtRouter);
router.use('/orders', orderRouter);
router.use('/categories', categoryRouter);
router.use('/suppliers', supplierRouter);

// Root route to show login status
router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out");
});

module.exports = router;