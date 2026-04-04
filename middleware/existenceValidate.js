const mongodb = require('../models/db');
const ObjectId = require('mongodb').ObjectId;

/**
 * Validates that referenced documents exist in their respective collections
 * @param {Object} fieldMappings - Map of field name to collection name
 * Example: { supplierId: 'suppliers', categoryId: 'categories' }
 */
const validateExistence = (fieldMappings) => {
    return async (req, res, next) => {
        try {
            const db = mongodb.getDb().db();

            for (const [fieldName, collectionName] of Object.entries(fieldMappings)) {
                const fieldValue = req.body[fieldName];

                if (!fieldValue) {
                    continue; // Skip if field doesn't exist in body
                }

                // Validate that we have a valid MongoDB ObjectId format
                if (!ObjectId.isValid(fieldValue)) {
                    return res.status(412).json({
                        success: false,
                        message: 'Validation failed',
                        data: `${fieldName} is not a valid MongoDB ObjectId`
                    });
                }

                // Check if the referenced document exists
                const existingDocument = await db
                    .collection(collectionName)
                    .findOne({ _id: new ObjectId(fieldValue) });

                if (!existingDocument) {
                    return res.status(412).json({
                        success: false,
                        message: 'Validation failed',
                        data: `${fieldName} references a ${collectionName.slice(0, -1)} that does not exist`
                    });
                }
            }

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Validation error',
                data: error.message
            });
        }
    };
};

module.exports = validateExistence;
