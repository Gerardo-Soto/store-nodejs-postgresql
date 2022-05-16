const Joi = require('joi');

const description = Joi.string().min(5).max(255);
const categoryId = Joi.number().integer();
const id = Joi.number().integer();
const image = Joi.string().uri();
const name = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);
const priceLimit = Joi.number.integer();
const priceMin = Joi.number.integer();
const priceMax = Joi.number.integer();

// pagination
const limit = Joi.number().integer();
const offset = Joi.number().integer();

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

const queryProductSchema = Joi.object({
  limit,
  offset,
  priceLimit,
  priceMin,
  priceMax: priceMax.when('priceMin', {
    is: Joi.number().integer(),
    // if: error priceMax is required, then:
    // is: Joi.number().integer().required(),
    then: Joi.require()
  })
});

module.exports = { 
  createProductSchema, 
  updateProductSchema, 
  getProductSchema, 
  queryProductSchema };