'use strict';

//const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { CATEGORY_TABLE, CategorySchema } = require('./../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);// hard entity
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);// soft entity
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable(PRODUCT_TABLE);// soft entity
    await queryInterface.dropTable(CATEGORY_TABLE);// hard entity
  }
};
