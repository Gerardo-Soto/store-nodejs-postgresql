'use strict';

const { DataTypes, Sequelize} = require('sequelize');

const { USER_TABLE, UserSchema } = require('./../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('./../models/customer.model');
const { ORDER_TABLE, OrderSchema } = require('./../models/order.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('./../models/order-product.model');
const { CATEGORY_TABLE, CategorySchema } = require('./../models/category.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      // attributes with properties
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          // in JS, the variables is named using camelCase, but in DDBB is used snake_case:
          field: 'created_at',
          defaultValue: Sequelize.NOW,
      },
      //foreignKey:
      customerId: {
          // in JS, the variables is named using camelCase, but in DDBB is used snake_case:
          field: 'customer_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: CUSTOMER_TABLE,
        key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',  
      },
    });
    /* My error was create first products without a category table */
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
