//Packages:
const express = require('express');
const router = express.Router()

const OrderService = require('./../services/orderService');

//Middleware
const validatorHandler = require('./../middlewares/validatorHandler');

const {} = require('./../schemas/orderSchema');

module.exports = router;