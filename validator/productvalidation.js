const Joi = require('joi');

class ProductValidator {
    static productSchema() {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            price: Joi.number().required(),
            imageUrl:Joi.string().trim().required(),
        });
        return schema;
    };
    static updateproductSchema() {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            price: Joi.number().required(),
            imageUrl:Joi.string().trim().required(),
            _id:Joi.string().trim().required()
        });
        return schema;
    };
}

module.exports = ProductValidator;