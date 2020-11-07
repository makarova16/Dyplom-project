'use strict';
module.exports = (sequelize, DataTypes) => {
  const likedProducts = sequelize.define('likedProducts', {
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  likedProducts.associate = function(models) {
    // associations can be defined here
  };
  return likedProducts;
};