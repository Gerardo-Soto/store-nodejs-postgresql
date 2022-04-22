const { Model, DataTypes, Sequelize } = require('sequelize');

// Data to make the structure of database on Postgres.
// This makes the ORM easier to do operations on the SQL Engine.

const CUSTOMER_TABLE = 'customer';

//schema: database structure. (No validate, Joi validate the data in /schemas/customerSchemas.js)
const CustomerSchema = {
    // attributes with properties:
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
}

// Class to create Customer Objects.
class Customer extends Model{
    // Methods statics: we don't need declare the object to access to this methods. customer customer 
    static associate(models){
        // Associations with the tables
        this.belongsTo(models.User, {as: 'user'});
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamp: false
        }
    }

}

module.exports = { USER_TABLE, CustomerSchema, Customer };