const boom = require('@hapi/boom');

// our new connection using ORM
// sequelize.setupModels.init makes a namespace where saved all models, called:
// database/user.models.js > config > modelName: 'User' == models.User
const { models } = require('../libs/sequelize');


class CustomerService {
    constructor(){
        // old connection, the new pool is into Sequelize library
    }

    async create(data){
        const newCustomer = await  models.Customer.create(data);
        return newCustomer;
    }

    async findAll(){
        const allCustomers = await models.Customer.findAll();
        return allCustomers;
    }

    async findOne(id){
        const customer = await models.customer.findByPk(id);
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/findOne].');
        }
        return customer;
    }

    async updateOne(id, changes){
        const customer = await models.customer.findByPk(id);
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/updateOne].');
        }

        const customerUpdated = await models.customer.update(changes);
        return customerUpdated;
    }

    async deleteOne(id){
        const customer = await models.customer.findOne(id);
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/deleteOne].');
        }

        await customer.destroy();
        return { id };
    }
}

module.exports = { customerService };