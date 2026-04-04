const e = require('express');
const mongodb = require('../models/db');
const ObjectId = mongodb.ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Suppliers']
    const result = await mongodb.getDb().db().collection('suppliers').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['Suppliers']
    const supplierId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('suppliers').find({ _id: supplierId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
}

const createSupplier = async (req, res) => {
    // #swagger.tags = ['Suppliers']
    const supplier = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    const response = await mongodb.getDb().db().collection('suppliers').insertOne(supplier);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the supplier.');
    }
};

const updateSupplier = async (req, res) => {
    // #swagger.tags = ['Suppliers']
    const supplierId = new ObjectId(req.params.id);
    const supplier = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    const response = await mongodb.getDb().db().collection('suppliers').updateOne({ _id: supplierId }, { $set: supplier });
    if (response.acknowledged) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the supplier.');
    }
};

const deleteSupplier = async (req, res) => {
    // #swagger.tags = ['Suppliers']
    const supplierId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('suppliers').deleteOne({ _id: supplierId });
    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: 'Supplier not found.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
