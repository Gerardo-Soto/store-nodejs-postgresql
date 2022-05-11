const boom = require('@hapi/boom');

// our new connection using ORM
// sequelize.setupModels.init makes a namespace where saved all models, called:
// database/user.models.js > config > modelName: 'User' == models.User
const { models } = require('./../libs/sequelize');
class CategoryService {

  constructor(){
    // old connection, the new pool is into Sequelize library
        /*this.pool = pool;
        this.pool.on('error', (err) => console.log(err));*/
  }

  async create(data) {
    // this data is already validated by the middleware
    console.log(data);
    // Create the new user with ORM:
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const findAllCategories = await models.Category.findAll();
    return findAllCategories;
  }

  async findOne(id) {
    // this id is already validate by the middleware
    const findCategory = await models.Category.findByPk(id, {
      include: ['products']
    });
    return { findCategory };
  }

  async update(id, changes) {
    // this id and changes are already validate by the middleware
    const category = await this.findOne(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async delete(id) {
    // this id is already validate by the middleware
    const deletedCategory = await this.findOne(id);
    await deletedCategory.destroy();
    return { id };
  }

}

module.exports = CategoryService;