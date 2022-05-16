//Packages:
const express = require('express');
const router = express.Router()// = /products at g-flix/index.js

// Services:
const ProductService = require('../services/productService');

// Middleware:
const validatorHandler = require('../middlewares/validatorHandler');

// Schema:
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema,
  queryProductSchema,
} = require('../schemas/productSchema');

// initialization class ProductService
const productService = new ProductService();


// route of all products
router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res, next) => {
  try {
    const products = await productService.find(req.query);
    res.status(200).json(products);
    
  } catch (error) {
    next(error);  
  }
});


// Use of filter:
router.get('/filter', (req, res) => {
  res.status(200).send('I\'m a filter.');
});


// route to get a specific product by ID
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),// Middleware to validate data
  async (req, res, next) => {// Middleware to catch some error
    try {
      const { id } = req.params;
      const product = await productService.findOneV2(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);


// route to get the detail product
router.get('/:id/details',
  validatorHandler(getProductSchema, 'params'),// Middleware to validate data
  async (req, res) => {
  const { id } = req.params;
  const product = await productService.findOne(id);
  if (product) {
    res.status(200).json({
      product
    });
  } else {
    res.status(404).json({
      id,
      detail: 'Not found.'
    });
  }
});


// route to create product (/products == /)
router.post('/',
  validatorHandler(createProductSchema, 'body'),// Middleware to validate data.
  async (req, res) => {
  const body = req.body;// Get the body request
  const newProduct = await productService.create(body);
  res.status(201).json({newProduct});
});


// route to partial update product
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),// Middleware to validate id
  validatorHandler(updateProductSchema, 'body'),// Middleware to validate data
  async (req, res, next) => {
  try {
    const { id } = req.params;// get url params
    const body = req.body;// Get the body request
    const product = await productService.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    //res.status(404).json({message: error.message});
    // send error to Middleware:
    next(error);
  }
});


// router to delete a product
router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),// Middleware to validate data
  async (req, res) => {
  const { id } = req.params;
  const product = await productService.delete(id);
  if (product) {
    res.status(201).json({
      message: 'Product deleted successfully',
      id
    });
  } else {
    res.status(404).json({
      message: 'Product not found.',
    });
  }
});

// Export router
module.exports = router;