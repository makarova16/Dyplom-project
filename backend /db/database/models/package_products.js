'use strict';
module.exports = (sequelize, DataTypes) => {
  const package_products = sequelize.define('package_products', {
    package_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  package_products.associate = function(models) {
    // associations can be defined here
  };
  return package_products;
};