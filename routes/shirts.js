const express = require('express');
const router = express.Router();
const shirtsController = require('../controllers/shirts');
// const { isAuthenticated } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const validateExistence = require('../middleware/existenceValidate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all shirts (Public)
router.get('/', shirtsController.getAll);

// GET single shirt (Public)
router.get('/:id', shirtsController.getSingle);

// POST new shirt (Protected + Validated)
router.post('/', validate(schemas.shirt), validateExistence({ supplierId: 'suppliers', categoryId: 'categories' }), /* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Shirt' } } */ shirtsController.createShirt);

// PUT update shirt (Protected + Validated)
router.put('/:id', validate(schemas.shirt), validateExistence({ supplierId: 'suppliers', categoryId: 'categories' }), /* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Shirt' } } */ shirtsController.updateShirt);

// DELETE shirt
router.delete('/:id', shirtsController.deleteShirt);

module.exports = router;