const { Model, DataTypes, Sequelize } = require('sequelize');

// Data to make the structure of database on Postgres.
// This makes the ORM easier to do operations on the SQL Engine.

const USER_TABLE = 'users';

//schema: database structure. (No validate, Joi validate the data in /schemas/*Schemas.js)
const UserSchema = {
    // attributes with properties:
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        // in JS, the variables is named using camelCase, but in DDBB is used snake_case:
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    isActivated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_activated',
    }
}

class User extends Model {
    // Methods statics: we don't need declare the object to access to this methods.
    static associate(){}

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }
