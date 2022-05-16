const { Model, DataTypes, Sequelize} = require('sequelize');

// Data to make the structure of database on Postgres.
// This makes the ORM easier to do operations on the SQL Engine.

const ORDER_TABLE = 'orders';

const CUSTOMER_TABLE = require('./customer.model');

const OrderSchema = {
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
            
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
		},
        /*references: CUSTOMER_TABLE,
        referenceKey: 'id',*/
    }
}

// Class to create Order Objects with their config and associations.
class Order extends Model {
    // Methods statics: we don't need declare the object to access to this methods. customer customer 
    static associate(models){
        // Associations with the tables
        // 1 order has 1 customer:
        this.belongsTo(models.Customer, {as: 'customer'});

        // M orders has M products:
        this.belongsToMany(models.Products, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    }


    static config(sequelize){
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamp: false
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };