'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        sku: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            validate: { min: 0 }
        },
    }, {});
    return Product;
};