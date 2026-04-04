const createCRUDController = require('../utils/crudControllerFactory');

// Factory creates: getAll, getSingle, delete
const base = createCRUDController('suppliers', 'id');

// Custom data mapper for suppliers
const supplierDataMapper = (body) => ({
    supplierName: body.supplierName,
    email: body.email,
    phone: body.phone
});

module.exports = {
    getAll: base.getAll,
    getSingle: base.getSingle,
    createSupplier: base.create(supplierDataMapper),
    updateSupplier: base.update(supplierDataMapper),
    deleteSupplier: base.delete
};
