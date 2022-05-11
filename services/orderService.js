const boom = require('@hapi/boom');

// our new connection using ORM
// sequelize.setupModels.init makes a namespace where saved all models, called:
// database/order.models.js > config > modelName: 'Order' == models.Order
const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const findAllOrder = await models.Order.findAll();//include
    return findAllOrder
  }

  async findOne(id) {
    const findOrder = await models.Order.findByPk(id, {
      //include: ['customer']
      //more detail:
      include: [{
        association: 'customer',
        include: ['user']
      }]
    });
    return findOrder;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const orderUpdated = await order.update(changes);
    return orderUpdated;
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;

