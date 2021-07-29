const Joi = require('joi');

class UserValidator {
    static userSchema() {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            username: Joi.string().min(4).required(),
            phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
            password: Joi.string().min(5).max(10).required(),
            role: Joi.string().trim().required()
        });
        return schema;
    };
    static updateSchema() {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            username: Joi.string().min(4).required(),
            phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
            password: Joi.string().min(5).max(10).required(),
            role: Joi.string().trim().required(),
            _id: Joi.string().trim().required()
        });
        return schema;
    };
    static authSchema() {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(5).max(10).required(),
        });
        return schema;
    };
}

module.exports = UserValidator;