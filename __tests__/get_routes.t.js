const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const mongodb = require('../models/db');

const app = express();
app.use(express.json());
app.use('/', router);

jest.mock('../models/db');
jest.mock('../middleware/authenticate', () => ({
    ensureAuthenticated: (req, res, next) => next(),
    ensureGithubOAuthConfigured: (req, res, next) => next()
}));
jest.mock('../middleware/existenceValidate', () => {
    return () => (req, res, next) => next();
});

const mockData = [
    { _id: '65cc62d78a045768911c589d', name: 'Test Item A' },
    { _id: '65cc62d78a045768911c589e', name: 'Test Item B' }
];

const setupMockDb = (collectionName, data, result = { acknowledged: true }) => {
    mongodb.getDb.mockReturnValue({
        db: () => ({
            collection: (name) => {
                if (name === collectionName) {
                    return {
                        find: jest.fn().mockReturnValue({
                            toArray: jest.fn().mockResolvedValue(Array.isArray(data) ? data : [data])
                        }),
                        insertOne: jest.fn().mockResolvedValue(result),
                        updateOne: jest.fn().mockResolvedValue(result),
                        replaceOne: jest.fn().mockResolvedValue(result),
                        deleteOne: jest.fn().mockResolvedValue(result)
                    };
                }
            }
        })
    });
};

describe('GET Routes - Shirts', () => {
    test('GET /shirts should return all shirts', async () => {
        setupMockDb('shirts', mockData);
        const res = await request(app).get('/shirts');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test('GET /shirts/:id should return a single shirt', async () => {
        setupMockDb('shirts', mockData[0]);
        const res = await request(app).get('/shirts/65cc62d78a045768911c589d');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Test Item A');
    });
});

describe('GET Routes - Orders', () => {
    test('GET /orders should return all orders', async () => {
        setupMockDb('orders', [{ orderId: 101, total: 50 }]);
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(200);
        expect(res.body[0].orderId).toBe(101);
    });
});

test('GET /shirts/:id with invalid format should return 500', async () => {
    const res = await request(app).get('/shirts/not-a-valid-object-id');
    expect(res.statusCode).toBe(500);
});

describe('POST/PUT/DELETE Routes - Shirts', () => {
    const validShirt = {
        productName: "Classic Oxford",
        sleeveLength: "Long",
        fabricType: "Cotton",
        fit: "Regular",
        color: "Blue",
        price: 45,
        size: "L",
        stockQuantity: 50,
        supplierId: "507f1f77bcf86cd799439012",
        categoryId: "507f1f77bcf86cd799439014"
    };

    test('POST /shirts should return 201', async () => {
        setupMockDb('shirts', null, { acknowledged: true, insertedId: '123' });
        const res = await request(app).post('/shirts').send(validShirt);
        expect(res.statusCode).toBe(201);
    });

    test('PUT /shirts/:id should return 200', async () => {
        setupMockDb('shirts', null, { acknowledged: true, modifiedCount: 1 });
        const res = await request(app).put('/shirts/65cc62d78a045768911c589d').send(validShirt);
        if (res.statusCode === 500) console.log('PUT Error Body:', res.body);
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /shirts/:id should return 200', async () => {
        setupMockDb('shirts', null, { acknowledged: true, deletedCount: 1 });
        const res = await request(app).delete('/shirts/65cc62d78a045768911c589d');
        if (res.statusCode === 404) console.log('DELETE Route not found. Check routes/shirts.js');
        expect(res.statusCode).toBe(200);
    });
});

describe('Error Branch Coverage', () => {
    test('GET /shirts should return 500 when database crashes', async () => {
        mongodb.getDb.mockImplementationOnce(() => {
            throw new Error('Critical Database Failure');
        });
        const res = await request(app).get('/shirts');
        expect(res.statusCode).toBe(500);
    });
});