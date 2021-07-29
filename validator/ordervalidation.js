const Joi = require('joi');

class OrderValidator {
    static orderupdateSchema() {
        const schema = Joi.object({
            status: Joi.string().trim().required(),
            _id: Joi.string().trim().required(),
            _rev:Joi.string().trim().required()
        });
        return schema;
    };
   
}

module.exports = OrderValidator;