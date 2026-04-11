const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const validate = require('../middleware/validate');
const validateExistence = require('../middleware/existenceValidate');
const schemas = require('../middleware/validator'); // Joi schemas

router.get('/', /* #swagger.tags = ['Orders'] */ ordersController.getAll);

router.get('/:id', /* #swagger.tags = ['Orders'] */ ordersController.getSingle);

router.post('/', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), /* #swagger.tags = ['Orders'] */ ordersController.createOrder);

router.put('/:id', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), /* #swagger.tags = ['Orders'] */ ordersController.updateOrder);

router.delete('/:id', /* #swagger.tags = ['Orders'] */ ordersController.deleteOrder);

module.exports = router;