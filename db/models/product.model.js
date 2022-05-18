const { Model, DataTypes, Sequelize } = require('sequelize');

// table of associations
const { CATEGORY_TABLE } = require('./category.model');

// table name for Database
const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        allowNull: false,
        allowIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,

    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
        type: DataTypes.DATE,   
    },
    categoryId: {
        field: 'category_id',
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
    }
}

class Product extends Model {
    // associates
    static associate(models){
        // A Product has A Category
        this.belongsTo(models.Category, {
            as: 'category'
        });
    }

    //config
    static config(sequelize){
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = {ProductSchema, Product, PRODUCT_TABLE};