const createCRUDController = require('../utils/crudControllerFactory');
const ObjectId = require('mongodb').ObjectId;

// Factory creates: getAll, getSingle, delete
const base = createCRUDController('shirts', 'id');

// Custom data mapper for shirts (handles ObjectId conversion)
const shirtDataMapper = (body) => ({
    productName: body.productName,
    sleeveLength: body.sleeveLength,
    fabricType: body.fabricType,
    fit: body.fit,
    color: body.color,
    price: body.price,
    size: body.size,
    stockQuantity: body.stockQuantity,
    supplierId: new ObjectId(body.supplierId),
    categoryId: new ObjectId(body.categoryId)
});

module.exports = {
    getAll: base.getAll,
    getSingle: base.getSingle,
    createShirt: base.create(shirtDataMapper),
    updateShirt: base.update(shirtDataMapper),
    deleteShirt: base.delete
};