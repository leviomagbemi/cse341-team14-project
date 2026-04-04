const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');

// GET all suppliers
router.get('/', suppliersController.getAll);

// GET single supplier
router.get('/:id', suppliersController.getSingle);

// POST new supplier
router.post('/', suppliersController.createSupplier);

// PUT update supplier
router.put('/:id', suppliersController.updateSupplier);

// DELETE supplier
router.delete('/:id', suppliersController.deleteSupplier);

module.exports = router;