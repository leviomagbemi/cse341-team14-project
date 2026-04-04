const createCRUDController = require('../utils/crudControllerFactory');

// Factory creates: getAll, getSingle, delete
const base = createCRUDController('orders', 'id');

// Custom data mapper for orders
const orderDataMapper = (body) => ({
    customerEmail: body.customerEmail,
    shirtId: body.shirtId,
    quantity: body.quantity,
    status: body.status
});

module.exports = {
    getAll: base.getAll,
    getSingle: base.getSingle,
    createOrder: base.create(orderDataMapper),
    updateOrder: base.update(orderDataMapper),
    deleteOrder: base.delete
};
