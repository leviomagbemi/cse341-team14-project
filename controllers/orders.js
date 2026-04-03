const { order } = require('../middleware/validator');
const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Orders']
    const result = await mongodb.getDb().db().collection('orders').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Orders']
    const orderId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('orders').find({ _id: orderId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createOrder = async (req, res) => {
    // #swagger.tags = ['Orders']
    const order = {
        orderDate: req.body.orderDate,
        customerName: req.body.customerName,
        items: req.body.items, // Shirt IDs and quantities
        totalAmount: req.body.totalAmount,
        status: req.body.status
    };
    const response = await mongodb.getDb().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the order.');
    }
};

const updateOrder = async (req, res) => {
    // #swagger.tags = ['Orders']
    const orderId = new ObjectId(req.params.id);
    const order = {
        orderDate: req.body.orderDate,
        customerName: req.body.customerName,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        status: req.body.status
    };
    const response = await mongodb.getDb().db().collection('orders').replaceOne({ _id: orderId }, order);
    if (response.modifiedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: 'Order not found or no changes made.' });
    }
};

const deleteOrder = async (req, res) => {
    // #swagger.tags = ['Orders']
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('orders').deleteOne({ _id: orderId }, true);
    res.status(200).send();
};

module.exports = {
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};
