const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all suppliers
router.get('/', /* #swagger.tags = ['Suppliers'] */ suppliersController.getAll);

// GET single supplier
router.get('/:id', /* #swagger.tags = ['Suppliers'] */ suppliersController.getSingle);

// POST new supplier
router.post('/', validate(schemas.supplier), /* #swagger.tags = ['Suppliers'] */ suppliersController.createSupplier);

// PUT update supplier
router.put('/:id', validate(schemas.supplier), /* #swagger.tags = ['Suppliers'] */ suppliersController.updateSupplier);

// DELETE supplier
router.delete('/:id', /* #swagger.tags = ['Suppliers'] */ suppliersController.deleteSupplier);

module.exports = router;