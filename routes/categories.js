const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all
router.get('/', categoriesController.getAll);

// GET single
router.get('/:id', categoriesController.getSingle);

// POST
router.post('/', validate(schemas.category), categoriesController.createCategory);

// PUT
router.put('/:id', validate(schemas.category), categoriesController.updateCategory);

// DELETE
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;