const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Sleeve & Stitch Men's Shirt API",
        description: "API for managing a Men's Shirt Retail Shop, including Inventory, Orders, Categories, and Suppliers."
    },
    host: process.env.APP_BASE_URL, // we will change this to Render URL later
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);