const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(412).json({
                success: false,
                message: 'Validation failed',
                data: errorMessage
            });
        }
        next();
    };
};

module.exports = validate;