'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     * 
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // alter a table to add a new rol
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.rol);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
