const createCRUDController = require('../utils/crudControllerFactory');

const shirtDataMapper = (body) => ({
    productName: body.productName,
    sleeveLength: body.sleeveLength,
    fabricType: body.fabricType,
    fit: body.fit,
    color: body.color,
    price: body.price,
    size: body.size,
    stockQuantity: body.stockQuantity,
    supplierId: body.supplierId,
    categoryId: body.categoryId
});

const base = createCRUDController('shirts', 'id');

module.exports = {
    getAll: base.getAll,
    getSingle: base.getSingle,
    createShirt: base.create(shirtDataMapper),
    updateShirt: base.update(shirtDataMapper),
    deleteShirt: base.delete
};