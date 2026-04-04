const Joi = require('joi');

const schemas = {
    // 1. Shirts 
    shirt: Joi.object({
        productName: Joi.string().required(),
        sleeveLength: Joi.string().valid('Short', 'Long').required(),
        fabricType: Joi.string().valid('Cotton', 'Linen', 'Polyester', 'Blend').required(),
        fit: Joi.string().valid('Slim', 'Regular', 'Relaxed').required(),
        color: Joi.string().required(),
        price: Joi.number().positive().required(),
        size: Joi.string().valid('S', 'M', 'L', 'XL', 'XXL').required(),
        stockQuantity: Joi.number().integer().min(0).required(),
        supplierId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validates MongoDB ObjectId
        categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // Validates MongoDB ObjectId
    }),

    // 2. Orders
    order: Joi.object({
        customerEmail: Joi.string().email().required(),
        shirtId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Validates MongoDB ObjectId
        quantity: Joi.number().integer().min(1).required(),
        status: Joi.string().valid('Pending', 'Shipped', 'Delivered', 'Cancelled').default('Pending')
    }),

    // 3. Categories
    category: Joi.object({
        categoryName: Joi.string().required(),
        description: Joi.string().required(),
        season: Joi.string().valid('Spring', 'Summer', 'Fall', 'Winter', 'All-Season').required()
    }),

    // 4. Suppliers
    supplier: Joi.object({
        supplierName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9+\-\s()]*$/).required()
    })
};

module.exports = schemas;