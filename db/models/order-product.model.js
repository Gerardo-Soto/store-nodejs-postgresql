const { Model, DataTypes, Sequelize } = require('sequelize');
// Data to make the structure of database on Postgres.
// This makes the ORM easier to do operations on the SQL Engine.

// associate tables
const { ORDER_TABLE } = require('./order.models');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

//schema: database structure. (No validate, Joi validate the data in /schemas/customerSchemas.js)
const OrderProductSchema = {
    // attributes with properties:
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
	orderId: {
		field: 'order_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: ORDER_TABLE,
			key: 'id'
		},

		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	productId: {
		field: 'product_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: 'id'
		},

		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	}
}

// Class to create OrderProduct Objects with their config and associations.
class OrderProduct extends Model{
    // Methods statics: we don't need declare the object to access to this methods. customer customer 
    static associate(models){
        // Associations with the tables
        
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamp: false
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };