'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        address: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { min: 0, max: 100 }
        }
    }, {});
    Customer.associate = function(models) {
        Customer.hasMany(models.Order, { foreignKey: 'customerId', onDelete: 'cascade' });
    };
    return Customer;
};
