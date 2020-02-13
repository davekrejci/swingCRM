'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
  }, {});
  
  Order.associate = function(models) {
    Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', onDelete: 'cascade'  });
  };
  return Order;
};