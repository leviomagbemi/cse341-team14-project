const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const validate = require('../middleware/validate');
const validateExistence = require('../middleware/existenceValidate');
const schemas = require('../middleware/validator'); // Joi schemas

router.get('/', /* #swagger.tags = ['Orders'] */ ordersController.getAll);

router.get('/:id', /* #swagger.tags = ['Orders'] */ /* #swagger.parameters['id'] = { description: 'Order ID', type: 'string', in: 'path', required: true } */ ordersController.getSingle);

router.post('/', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), /* #swagger.tags = ['Orders'] */ /* #swagger.parameters['body'] = { in: 'body', description: 'Order payload', required: true, schema: { $ref: '#/definitions/Order', example: { customerEmail: 'customer@example.com', shirtId: '507f1f77bcf86cd799439011', quantity: 2, status: 'Pending' } } } */ ordersController.createOrder);

router.put('/:id', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), /* #swagger.tags = ['Orders'] */ /* #swagger.parameters['id'] = { description: 'Order ID', type: 'string', in: 'path', required: true } */ /* #swagger.parameters['body'] = { in: 'body', description: 'Order update payload', required: true, schema: { $ref: '#/definitions/Order', example: { customerEmail: 'customer@example.com', shirtId: '507f1f77bcf86cd799439011', quantity: 2, status: 'Pending' } } } */ ordersController.updateOrder);

router.delete('/:id', /* #swagger.tags = ['Orders'] */ /* #swagger.parameters['id'] = { description: 'Order ID', type: 'string', in: 'path', required: true } */ ordersController.deleteOrder);

module.exports = router;