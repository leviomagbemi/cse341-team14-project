const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all suppliers
router.get('/', suppliersController.getAll);

// GET single supplier
router.get('/:id', suppliersController.getSingle);

// POST new supplier
router.post('/', validate(schemas.supplier), /* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Supplier' } } */ suppliersController.createSupplier);

// PUT update supplier
router.put('/:id', validate(schemas.supplier), /* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Supplier' } } */ suppliersController.updateSupplier);

// DELETE supplier
router.delete('/:id', suppliersController.deleteSupplier);

module.exports = router;