const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Sleeve & Stitch Men's Shirt API",
        description: "API for managing a Men's Shirt Retail Shop, including Inventory, Orders, Categories, and Suppliers."
    },
    host: process.env.APP_BASE_URL, // we will change this to Render URL later
    schemes: ['http', 'https'],
    definitions: {
        Shirt: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                productName: { type: 'string', example: 'Classic Cotton Polo' },
                sleeveLength: { type: 'string', example: 'Short', enum: ['Short', 'Long'] },
                fabricType: { type: 'string', example: 'Cotton', enum: ['Cotton', 'Linen', 'Polyester', 'Blend'] },
                fit: { type: 'string', example: 'Regular', enum: ['Slim', 'Regular', 'Relaxed'] },
                color: { type: 'string', example: 'Navy Blue' },
                price: { type: 'number', example: 49.99 },
                size: { type: 'string', example: 'M', enum: ['S', 'M', 'L', 'XL', 'XXL'] },
                stockQuantity: { type: 'integer', example: 150 },
                supplierId: { type: 'string', example: '507f1f77bcf86cd799439012' },
                categoryId: { type: 'string', example: '507f1f77bcf86cd799439014' }
            }
        },
        Order: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439013' },
                customerEmail: { type: 'string', example: 'customer@example.com' },
                shirtId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                quantity: { type: 'integer', example: 2 },
                status: { type: 'string', example: 'Pending', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] }
            }
        },
        Category: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439014' },
                categoryName: { type: 'string', example: 'Summer Collection' },
                description: { type: 'string', example: 'Light and breathable shirts for warm weather' },
                season: { type: 'string', example: 'Summer', enum: ['Spring', 'Summer', 'Fall', 'Winter', 'All-Season'] }
            }
        },
        Supplier: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
                supplierName: { type: 'string', example: 'Premium Fabrics Inc.' },
                email: { type: 'string', example: 'supplier@fabrics.com' },
                phone: { type: 'string', example: '+1-555-123-4567' }
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);