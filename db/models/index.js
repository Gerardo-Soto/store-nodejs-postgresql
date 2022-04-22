// All ours models:  SetUp of all models

const { Customer, CustomerSchema } = require('./customer.model');
const { User, UserSchema} = require('./user.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));


    // Make the associations
    Customer.associate(sequelize.models);
}

module.exports = setupModels;