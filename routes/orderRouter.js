//Packages:
const express = require('express');
const router = express.Router()

const OrderService = require('./../services/orderService');
const service = new OrderService();

//Middleware
const validatorHandler = require('./../middlewares/validatorHandler');

const { createOrderSchema, getOrderSchema, updateOrderSchema } = require('./../schemas/orderSchema');

// get all orders
router.get('/', async (req, res, next) => {
    try {
        const order = await service.find();
        res.json(order);

    } catch (error) {
        next(error);
    }
});

// get a specific order
router.get('/:id',
validatorHandler(getOrderSchema, 'params'),
async (req, res, next) =>{
    try {
        // get the id from the url
        const { id } =  req.params;
        const order = await service.findOne(id);
        res.json(order);

    } catch (error) {
        next(error);    
    }
});

// create a new order
router.post('/',
validatorHandler(createOrderSchema, 'body'),
async(req, res, next) => {
    try {
        const body = req.body;
        const newOrder = await service.create(body);
        res.status(201).json(newOrder);

    } catch (error) {
        next(error);
    }
});

// update a order
router.patch('/:id',
validatorHandler(getOrderSchema, 'params'),
validatorHandler(updateOrderSchema, 'body'),
async(req, res, next) => {
    try {
        const { id } = req.params;
        const newBody = req.body;
        const updatedOrder = await service.update(id, newBody);
        res.status(201).json(updatedOrder);
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;