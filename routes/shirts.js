const express = require('express');
const router = express.Router();
const shirtsController = require('../controllers/shirts');
// const { isAuthenticated } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const validateExistence = require('../middleware/existenceValidate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all shirts (Public)
router.get('/', /* #swagger.tags = ['Shirts'] */ shirtsController.getAll);

// GET single shirt (Public)
router.get('/:id', /* #swagger.tags = ['Shirts'] */ /* #swagger.parameters['id'] = { description: 'Shirt ID', type: 'string', in: 'path', required: true } */ shirtsController.getSingle);

// POST new shirt (Protected + Validated)
router.post('/', validate(schemas.shirt), validateExistence({ supplierId: 'suppliers', categoryId: 'categories' }), /* #swagger.tags = ['Shirts'] */ /* #swagger.parameters['body'] = { in: 'body', description: 'Shirt payload', required: true, schema: { $ref: '#/definitions/Shirt', example: { productName: 'Classic Cotton Polo', sleeveLength: 'Short', fabricType: 'Cotton', fit: 'Regular', color: 'Navy Blue', price: 49.99, size: 'M', stockQuantity: 150, supplierId: '507f1f77bcf86cd799439012', categoryId: '507f1f77bcf86cd799439014' } } } */ shirtsController.createShirt);

// PUT update shirt (Protected + Validated)
router.put('/:id', validate(schemas.shirt), validateExistence({ supplierId: 'suppliers', categoryId: 'categories' }), /* #swagger.tags = ['Shirts'] */ /* #swagger.parameters['id'] = { description: 'Shirt ID', type: 'string', in: 'path', required: true } */ /* #swagger.parameters['body'] = { in: 'body', description: 'Shirt update payload', required: true, schema: { $ref: '#/definitions/Shirt', example: { productName: 'Classic Cotton Polo', sleeveLength: 'Short', fabricType: 'Cotton', fit: 'Regular', color: 'Navy Blue', price: 49.99, size: 'M', stockQuantity: 150, supplierId: '507f1f77bcf86cd799439012', categoryId: '507f1f77bcf86cd799439014' } } } */ shirtsController.updateShirt);

// DELETE shirt
router.delete('/:id', /* #swagger.tags = ['Shirts'] */ /* #swagger.parameters['id'] = { description: 'Shirt ID', type: 'string', in: 'path', required: true } */ shirtsController.deleteShirt);

module.exports = router;