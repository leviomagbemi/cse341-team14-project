const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
    info: {
        title: "Sleeve & Stitch Men's Shirt API",
        description: "API for managing a Men's Shirt Retail Shop, including Inventory, Orders, Categories, and Suppliers."
    },
    host: process.env.APP_BASE_URL || 'localhost:8080',
    basePath: '/',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http', 'https'],
    definitions: {
        Shirt: {
            productName: 'Classic Cotton Polo',
            sleeveLength: 'Short',
            fabricType: 'Cotton',
            fit: 'Regular',
            color: 'Navy Blue',
            price: 49.99,
            size: 'M',
            stockQuantity: 150,
            supplierId: '507f1f77bcf86cd799439012',
            categoryId: '507f1f77bcf86cd799439014'
        },
        Order: {
            customerEmail: 'customer@example.com',
            shirtId: '507f1f77bcf86cd799439011',
            quantity: 2,
            status: 'Pending'
        },
        Category: {
            categoryName: 'Summer Collection',
            description: 'Light and breathable shirts for warm weather',
            season: 'Summer'
        },
        Supplier: {
            supplierName: 'Premium Fabrics Inc.',
            email: 'supplier@fabrics.com',
            phone: '+1-555-123-4567'
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);