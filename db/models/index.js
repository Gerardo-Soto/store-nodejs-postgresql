// All ours models:  SetUp of all models

const { Category, CategorySchema } = require('./category.model');// hard entity
const { Customer, CustomerSchema } = require('./customer.model');// hard entity
const { Product, ProductSchema } = require('./product.model');// soft entity
const { User, UserSchema } = require('./user.model');// hard entity
const { Order, OrderSchema } = require('./order.model');// soft entity
const { OrderProduct, OrderProductSchema} = require('./order-product.model');


function setupModels(sequelize) {
    // load configuration of all Schemas
    Customer.init(CustomerSchema, Customer.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));

    Order.init(OrderSchema, Order.config(sequelize));

    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


    //Make the associations

    // creation of associations  [1-1]
    User.associate(sequelize.models);// hard entity
    Customer.associate(sequelize.models);// hard entity

    // creation of associations   [1-M]
    Category.associate(sequelize.models);// hard entity
    Product.associate(sequelize.models);// soft entity

    // creation of association  Order M-1 Customer
    Order.associate(sequelize.models);// soft entity
}

module.exports = setupModels;