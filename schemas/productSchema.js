const Joi = require('joi');

const description = Joi.string().min(5).max(255);
const id = Joi.string().uuid();
const image = Joi.string().uri();
const name = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);


const createProductSchema = Joi.object({
  description: description.required(),
  image: image.required(),
  name: name.required(),
  price: price.required(),
});

const updateProductSchema = Joi.object({
  description: description,
  image: image,
  name: name,
  price: price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }