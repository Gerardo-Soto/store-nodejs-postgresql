const express = require('express');
const route = express.Router();// = /categories

// route of all categories
route.get('/categories', (req, res) => {
  res.status(200).send([{
    category: 'Comedy',
    quantity: 10,
  },
  {
    category: 'Action',
    quantity: 5,
  },
  {
    category: 'Fantasy',
    quantity: 7,
  }])
});

// route of some categories
route.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.status(200).json({
    categoryId,
    productId,
  });
});


// Export the routes:
module.exports = route;
