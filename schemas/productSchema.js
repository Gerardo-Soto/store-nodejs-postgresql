const Joi = require('joi');

const description = Joi.string().min(5).max(255);
const categoryId = Joi.number().integer();
const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);



const createProductSchema = Joi.object({
  categoryId: categoryId.required(),
  description: description.required(),
  id: id.required(),
  image: image.required(),
  name: name.required(),
  price: price.required(),
});

const updateProductSchema = Joi.object({
  categoryId: categoryId,
  description: description,
  image: image,
  name: name,
  price: price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }