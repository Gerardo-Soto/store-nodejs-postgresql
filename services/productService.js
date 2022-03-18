const faker = require('faker');
const boom = require('@hapi/boom');

// our old connection to DB by pool
//const pool = require('../libs/postgresPool');

// our new connection using the library Sequelize that use Pool
const sequelize = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    // old connection, the new pool is into Sequelize library
    /*this.pool = pool;
    this.pool.on('error', (err) => console.log(err));*/
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const query = 'SELECT * FROM tasks;';
    //const queryResponse = this.pool.query(query);
    const queryResponse = sequelize.query(query);
    return (await queryResponse).rows;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async findOneV2(id){
    /*const failed = this.getTotal();
    if (failed) {
      //pass
    }*/
    const product = this.products.find(product => product.id === id);
    if (!product) {
      // Send a status code 404:
      throw boom.notFound('Product not found (Boom Error handler)');
    } else if(product.isBlocked){
      throw boom.conflict('Product is blocked');// status code 409
    }
    return product;
  }


  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;