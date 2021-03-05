const Joi = require('joi');

const registerValidation = data =>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .min(6)
            .max(30)
            .required()
            .email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    try {
       return  schema.validateAsync(data);
    } catch (error) {
        return 'error'
    }
}
const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .max(30)
            .required()
            .email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

        
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;