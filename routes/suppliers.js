const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all suppliers
router.get('/', /* #swagger.tags = ['Suppliers'] */ suppliersController.getAll);

// GET single supplier
router.get('/:id', /* #swagger.tags = ['Suppliers'] */ /* #swagger.parameters['id'] = { description: 'Supplier ID', type: 'string', in: 'path', required: true } */ suppliersController.getSingle);

// POST new supplier
router.post('/', validate(schemas.supplier), /* #swagger.tags = ['Suppliers'] */ /* #swagger.parameters['body'] = { in: 'body', description: 'Supplier payload', required: true, schema: { $ref: '#/definitions/Supplier', example: { supplierName: 'Premium Fabrics Inc.', email: 'supplier@fabrics.com', phone: '+1-555-123-4567' } } } */ suppliersController.createSupplier);

// PUT update supplier
router.put('/:id', validate(schemas.supplier), /* #swagger.tags = ['Suppliers'] */ /* #swagger.parameters['id'] = { description: 'Supplier ID', type: 'string', in: 'path', required: true } */ /* #swagger.parameters['body'] = { in: 'body', description: 'Supplier update payload', required: true, schema: { $ref: '#/definitions/Supplier', example: { supplierName: 'Premium Fabrics Inc.', email: 'supplier@fabrics.com', phone: '+1-555-123-4567' } } } */ suppliersController.updateSupplier);

// DELETE supplier
router.delete('/:id', /* #swagger.tags = ['Suppliers'] */ /* #swagger.parameters['id'] = { description: 'Supplier ID', type: 'string', in: 'path', required: true } */ suppliersController.deleteSupplier);

module.exports = router;