const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authenticate');

// Import the sub-routers for each collection and auth
const shirtRouter = require('./shirts');
const orderRouter = require('./orders');
const categoryRouter = require('./categories');
const supplierRouter = require('./suppliers');
const authRouter = require('./auth');

// 1. Authentication Routes (public)
router.use('/auth', authRouter);

// 2. Documentation Route (Swagger) - public access
router.use('/', require('./swagger'));

// 3. Root route to show login status
router.get('/', (req, res) => {
    res.send(req.isAuthenticated ? (req.isAuthenticated() ? `Logged in as ${req.user.displayName}` : "Logged out") : "Logged out");
});

// 4. Protect all API collection routes
router.use('/shirts', ensureAuthenticated, shirtRouter);
router.use('/orders', ensureAuthenticated, orderRouter);
router.use('/categories', ensureAuthenticated, categoryRouter);
router.use('/suppliers', ensureAuthenticated, supplierRouter);

module.exports = router;