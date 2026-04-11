const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const validate = require('../middleware/validate');
const schemas = require('../middleware/validator'); // Joi schemas

// GET all
router.get('/', /* #swagger.tags = ['Categories'] */ categoriesController.getAll);

// GET single
router.get('/:id', /* #swagger.tags = ['Categories'] */ /* #swagger.parameters['id'] = { description: 'Category ID', type: 'string', in: 'path', required: true } */ categoriesController.getSingle);

// POST
router.post('/', validate(schemas.category), /* #swagger.tags = ['Categories'] */ /* #swagger.parameters['body'] = { in: 'body', description: 'Category payload', required: true, schema: { $ref: '#/definitions/Category', example: { categoryName: 'Summer Collection', description: 'Light and breathable shirts for warm weather', season: 'Summer' } } } */ categoriesController.createCategory);

// PUT
router.put('/:id', validate(schemas.category), /* #swagger.tags = ['Categories'] */ /* #swagger.parameters['id'] = { description: 'Category ID', type: 'string', in: 'path', required: true } */ /* #swagger.parameters['body'] = { in: 'body', description: 'Category update payload', required: true, schema: { $ref: '#/definitions/Category', example: { categoryName: 'Summer Collection', description: 'Light and breathable shirts for warm weather', season: 'Summer' } } } */ categoriesController.updateCategory);

// DELETE
router.delete('/:id', /* #swagger.tags = ['Categories'] */ /* #swagger.parameters['id'] = { description: 'Category ID', type: 'string', in: 'path', required: true } */ categoriesController.deleteCategory);

module.exports = router;