const express = require('express');

/*
For the routes, we need:
    -Services
    -Schema
    -Validators
*/
const CustomerService = require('../services/customerService');
const {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema,} = require('../schemas/customerSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const { CustomerSchema } = require('../db/models/customer.model');

// router: /customer
const router = express.Router();

const customerService = new CustomerService();

//Find all user registered:
router.get('/', async (req, res, next) => {
    try {
        const customers = await customerService.findAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
});

//Find a customer by ID
router.get('/:id',
validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
    try {
        // Get ID from the URL
        const { id } = req.params;
        const customer = await customerService.findOne(id);
        res.status(201).json(customer);
    } catch (error) {
        next(error);
    }
});

//Create a customer
router.post('/', validatorHandler(createCustomerSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const newCustomer = await customerService.create(body);
        res.status(201).json(newCustomer);
    } catch (error) {
        next(error);
    }
});

//update a customer
router.patch('/:id',
validatorHandler(getCustomerSchema, 'params'),
validatorHandler(updateCustomerSchema, 'body'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const customerUpdated = customerService.updateOne(id, body);
        res.status(201).json(customerUpdated);
    } catch (error) {
        next(error);
    }
});

//Delete a customer
router.delete('/:id', 
validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const customerDeleted = customerService.deleteOne(id);
        res.status(201).json(customerDeleted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;