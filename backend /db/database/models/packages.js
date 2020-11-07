'use strict';
module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define('packages', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  packages.associate = function(models) {
    // associations can be defined here
  };
  return packages;
};