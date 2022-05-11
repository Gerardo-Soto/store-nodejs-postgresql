// Libraries
const express = require('express');

// our data
const CategoryServer = require('./../services/categoryService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require('./../schemas/categorySchema');

const route = express.Router();// api route => /categories
const service = new CategoryServer();

// route to get all categories
route.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// route to get a categories
route.get('/:id', 
validatorHandler(getCategorySchema, 'params'), 
async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// route to create a category
route.post('/', 
validatorHandler(createCategorySchema, 'body'), 
async (req, res, next) => {
  try {
    const bodyCategory = req.body;
    const newCategory = await service.create(bodyCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// route to update a category
route.patch('/:id', 
validatorHandler(getCategorySchema, 'params'), 
validatorHandler(updateCategorySchema, 'body'), 
async (req, res, next) => {
  try {
    const { id } = req.params;
    const bodyCategory = req.body;
    const updatedCategory = await service.update(id, bodyCategory);
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// route to delete a category
route.delete('/:id',
validatorHandler(getCategorySchema, 'params'),
async(req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch (error) {
    next(error);
  }
});


// Export the routes:
module.exports = route;
