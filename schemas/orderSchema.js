const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const isDelivered = Joi.boolean();
const isPaid = Joi.boolean();
const isCanceled = Joi.boolean();



const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
    id: id.required()
});

const updateOrderSchema = Joi.object({
    id: id.required(),
    isDelivered,
    isPaid,
    isCanceled,
});

module.exports = { createOrderSchema, getOrderSchema, updateOrderSchema};