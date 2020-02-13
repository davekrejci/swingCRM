'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    sku: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.FLOAT
    },
    total: {
      type: DataTypes.FLOAT
    }
  }, {});
  return OrderItem;
};