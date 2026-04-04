const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const validate = require('../middleware/validate');
const validateExistence = require('../middleware/existenceValidate');
const schemas = require('../middleware/validator'); // Joi schemas

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getSingle);
router.post('/', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), ordersController.createOrder);
router.put('/:id', validate(schemas.order), validateExistence({ shirtId: 'shirts' }), ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;