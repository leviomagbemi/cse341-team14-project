const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all
router.get('/', /* #swagger.tags = ['Categories'] */ categoriesController.getAll);

// GET single
router.get('/:id', /* #swagger.tags = ['Categories'] */ categoriesController.getSingle);

// POST
router.post('/', validate(schemas.category), /* #swagger.tags = ['Categories'] */ categoriesController.createCategory);

// PUT
router.put('/:id', validate(schemas.category), /* #swagger.tags = ['Categories'] */ categoriesController.updateCategory);

// DELETE
router.delete('/:id', /* #swagger.tags = ['Categories'] */ categoriesController.deleteCategory);

module.exports = router;