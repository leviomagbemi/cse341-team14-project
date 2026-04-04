const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

// GET all
router.get('/', categoriesController.getAll);

// GET single
router.get('/:id', categoriesController.getSingle);

// POST
router.post('/', categoriesController.createCategory);

// PUT
router.put('/:id', categoriesController.updateCategory);

// DELETE
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;