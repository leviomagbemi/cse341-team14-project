const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Shirts']
    try {
        const result = await mongodb.getDb().db().collection('shirts').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Shirts']
    try {
        const shirtId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('shirts').find({ _id: shirtId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createShirt = async (req, res) => {
    // #swagger.tags = ['Shirts']
    const shirt = {
        productName: req.body.productName,
        sleeveLength: req.body.sleeveLength,
        fabricType: req.body.fabricType,
        fit: req.body.fit,
        color: req.body.color,
        price: req.body.price,
        size: req.body.size,
        stockQuantity: req.body.stockQuantity
    };
    const response = await mongodb.getDb().db().collection('shirts').insertOne(shirt);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the shirt.');
    }
};

// someone should add updateShirt and deleteShirt functions similarly...

module.exports = {
    getAll,
    getSingle,
    createShirt
};