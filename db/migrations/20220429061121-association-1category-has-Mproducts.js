'use strict';

const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');
const { CATEGORY_TABLE } = require('./../models/category.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(PRODUCT_TABLE, "category_id", {
      //field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      references: {
          model: CATEGORY_TABLE,
          key: 'id',
      },
      /*references: CATEGORY_TABLE,
      refereceKey: 'id',*/
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, "category_id");
  }
};
