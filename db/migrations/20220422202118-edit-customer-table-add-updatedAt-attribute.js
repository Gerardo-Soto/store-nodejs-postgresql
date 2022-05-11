'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('./../models/customer.model');
//const newColumn = 'updated_at';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  //   await queryInterface.addColumn(CUSTOMER_TABLE, newColumn, CustomerSchema.updatedAt);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //await queryInterface.removeColumn(CUSTOMER_TABLE, newColumn);
  }
};
