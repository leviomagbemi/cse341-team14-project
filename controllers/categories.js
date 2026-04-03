const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Categories']
    const result = await mongodb.getDb().db().collection('categories').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Categories']
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('categories').find({ _id: categoryId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createCategory = async (req, res) => {
    // #swagger.tags = ['Categories']
    const category = {
        name: req.body.name,
        description: req.body.description,
        season: req.body.season
    };
    const response = await mongodb.getDb().db().collection('categories').insertOne(category);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the category.');
    }
};

const updateCategory = async (req, res) => {
    // #swagger.tags = ['Categories']
    const categoryId = new ObjectId(req.params.id);
    const category = {
        name: req.body.name,
        description: req.body.description,
        season: req.body.season
    };
    const response = await mongodb.getDb().db().collection('categories').updateOne({ _id: categoryId }, { $set: category });
    if (response.acknowledged) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the category.');
    }
};

const deleteCategory = async (req, res) => {
    // #swagger.tags = ['Categories']
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('categories').deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: 'Category not found.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCategory,
    updateCategory,
    deleteCategory
};  