// All ours models:  SetUp of all models

const { Category, CategorySchema } = require('./category.model');// hard entity
const { Customer, CustomerSchema } = require('./customer.model');// hard entity
const { Product, ProductSchema } = require('./product.model');// soft entity
const { User, UserSchema } = require('./user.model');// hard entity


function setupModels(sequelize) {
    // load configuration of all Schemas
    Customer.init(CustomerSchema, Customer.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));

    

    // creation of associations  [1-1]
    User.associate(sequelize.models);// hard entity
    Customer.associate(sequelize.models);// hard entity

    // creation of associations   [1-M]
    Category.associate(sequelize.models);// hard entity
    Product.associate(sequelize.models);// soft entity
}

module.exports = setupModels;