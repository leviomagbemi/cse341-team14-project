const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

/**
 * Factory function to create standard CRUD controllers for any collection
 * Eliminates duplicate logic across all controllers
 * @param {string} collectionName - Name of the MongoDB collection
 * @param {string} idParamName - Name of the ID parameter (e.g., 'shirtId')
 * @returns {Object} Controller object with getAll, getSingle, create, update, delete methods
 */
const createCRUDController = (collectionName, idParamName = 'id') => {
    return {
        getAll: async (req, res, next) => {
            try {
                const result = await mongodb.getDb().db().collection(collectionName).find();
                const items = await result.toArray();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(items);
            } catch (err) {
                next(err);
            }
        },

        getSingle: async (req, res, next) => {
            try {
                const id = new ObjectId(req.params[idParamName]);
                const result = await mongodb.getDb().db().collection(collectionName).find({ _id: id });
                const item = await result.toArray();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(item[0]);
            } catch (err) {
                next(err);
            }
        },

        create: (dataMapper, uniqueField) => async (req, res, next) => {
            try {
                const data = dataMapper(req.body);
                // Check for duplicate if a unique field is specified
                if (uniqueField && data[uniqueField]) {
                    const existing = await mongodb.getDb().db().collection(collectionName)
                        .findOne({ [uniqueField]: data[uniqueField] });
                    if (existing) {
                        return res.status(400).json({
                            success: false,
                            message: `A ${collectionName.slice(0, -1)} with that ${uniqueField} already exists.`
                        });
                    }
                }
                const response = await mongodb.getDb().db().collection(collectionName).insertOne(data);
                if (response.acknowledged) {
                    res.status(201).json(response);
                } else {
                    res.status(500).json({
                        success: false,
                        message: `Some error occurred while creating the ${collectionName.slice(0, -1)}.`
                    });
                }
            } catch (err) {
                next(err);
            }
        },

        update: (dataMapper, uniqueField) => async (req, res, next) => {
            try {
                const id = new ObjectId(req.params[idParamName]);
                const data = dataMapper(req.body);
                // Check for duplicate if a unique field is specified (exclude self)
                if (uniqueField && data[uniqueField]) {
                    const existing = await mongodb.getDb().db().collection(collectionName)
                        .findOne({ [uniqueField]: data[uniqueField], _id: { $ne: id } });
                    if (existing) {
                        return res.status(400).json({
                            success: false,
                            message: `Another ${collectionName.slice(0, -1)} with that ${uniqueField} already exists.`
                        });
                    }
                }
                const response = await mongodb.getDb().db().collection(collectionName).updateOne({ _id: id }, { $set: data });
                if (response.acknowledged) {
                    res.status(200).json(response);
                } else {
                    res.status(500).json({
                        success: false,
                        message: `Some error occurred while updating the ${collectionName.slice(0, -1)}.`
                    });
                }
            } catch (err) {
                next(err);
            }
        },

        delete: async (req, res, next) => {
            try {
                const id = new ObjectId(req.params[idParamName]);
                const response = await mongodb.getDb().db().collection(collectionName).deleteOne({ _id: id });
                if (response.deletedCount > 0) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        success: false,
                        error: `${collectionName.slice(0, -1).charAt(0).toUpperCase() + collectionName.slice(1, -1)} not found.`
                    });
                }
            } catch (err) {
                next(err);
            }
        }
    };
};

module.exports = createCRUDController;
