const boom = require('@hapi/boom');
const { cookie } = require('express/lib/response');

const bcrypt = require('bcrypt');
// our new connection using ORM
// sequelize.setupModels.init makes a namespace where saved all models, called:
// database/user.models.js > config > modelName: 'User' == models.User
const { models } = require('../libs/sequelize');


class CustomerService {
    constructor() {}

    async create(data){
        // encrypt sensitive data
        data.user.password = await bcrypt.hash(data.user.password, 6);
        
        // Create Customer with a user
        const newCustomer = await  models.Customer.create(
            data, 
            {
                // This costumer has an associate whit User
                // if there's a sub-object named user, this is a user, then create it:
                include: ['user']
            });
        return newCustomer;
    }

    async findAllCustomers(){
        const allCustomers = await models.Customer.findAll({
            include: ['user']
        });
        return allCustomers;
    }

    async findOne(id){
        const customer = await models.Customer.findByPk(id, {
            include: ['user']
        });
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/findOne].');
        }
        return customer;
    }

    async updateOne(id, changes){
        /*const customer = await models.customer.findByPk(id);
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/updateOne].');
        }

        const customerUpdated = await models.customer.update(changes);
        return customerUpdated;
        */
       const model = await this.findOne(id);
       const rta = await model.update(changes);
       return rta;
    }

    async deleteOne(id){
        const customer = await models.customer.findOne(id);
        if(!customer){
            throw boom.notFound('Ops. This Customer do not exist. [error: /services/customerService/deleteOne].');
        }

        await customer.destroy();
        return { id, rta: true };
    }
}

module.exports = CustomerService;