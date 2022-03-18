const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

const express = require('express');

function routerApi(app) {
  const routerApiV1 = express.Router();
  app.use('/api/v1', routerApiV1);// Path Global for Endpoints v1
  //app.use('/api/v1/products', productsRouter);

  routerApiV1.use('/products', productsRouter);
  routerApiV1.use('/users', usersRouter);
  routerApiV1.use('/categories', categoriesRouter);

  /*
  const routerApiV2 = express.Router();
  app.use('/api/v2', routerApiV2);// Path Global for Endpoints v2

  routerApiV2.use('/products', productsRouterV2);
  routerApiV2.use('/users', usersRouterV2);
  routerApiV2.use('/categories', categoriesRouterV2);
  */
}

module.exports = routerApi;

