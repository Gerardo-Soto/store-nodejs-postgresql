const {Joi} = require('joi');

const id = Joi.number().integer();
const name = Joi.string().name().max(50);
const lastName = Joi.string().name().max(100);
const phone = Joi.string().max(50);
const createdAt = Joi.string().max(30);

// Validations for "validatorHandler" routes
const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
});


const updateCustomerSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    //userId: userId,
});

const getCustomerSchema = Joi.object({
    id: id.required()
});

module.exports = { 
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema,
};