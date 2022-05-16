const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

// our old connection to DB by pool
//const pool = require('../libs/postgresPool');

// our new connection using the library Sequelize that use Pool
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
     // old connection, the new pool is into Sequelize library
    /*this.pool = pool;
    this.pool.on('error', (err) => console.log(err));*/
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    // association to ORM 
    const options = {
      include: ['category'],
      // sql where by default:
      where: {},
    }

    // Pagination: 
    const { limit, offset} = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    // Condition
    const { priceLimit } = query;
    if (priceLimit) {
      options.where.priceLimit = priceLimit;
    }

    // limits
    const { priceMin, priceMax } = query;
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  }


  async update(id, changes) {
    const findProduct = await this.findOne(id);
    const updatedProduct = await findProduct.update(id, changes);
    return updatedProduct;
  }

  async delete(id) {
    const findProduct = await this.findOne(id);
    await findProduct.destroy();
    return { id };
  }

}

module.exports = ProductsService;