const createCRUDController = require('../utils/crudControllerFactory');

// Factory creates: getAll, getSingle, delete
const base = createCRUDController('categories', 'id');

// Custom data mapper for categories
const categoryDataMapper = (body) => ({
    categoryName: body.categoryName,
    description: body.description,
    season: body.season
});

module.exports = {
    getAll: base.getAll,
    getSingle: base.getSingle,
    createCategory: base.create(categoryDataMapper, 'categoryName'),
    updateCategory: base.update(categoryDataMapper, 'categoryName'),
    deleteCategory: base.delete
};  