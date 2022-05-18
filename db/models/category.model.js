const { Model, DataTypes, Sequelize } = require('sequelize');

// table name for Database
const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
        type: DataTypes.DATE,
        
    }
};

class Category extends Model {
    // associates
    static associate(models){
        // A Category has many Products
        this.hasMany(models.Product, {
            //alias associate:
            as: 'products',
            foreignKey: 'categoryId'// model's attribute name on product's table
        });
    }

    //config
    static config(sequelize){
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };