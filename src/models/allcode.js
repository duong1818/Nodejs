'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AllCode.hasMany(models.User, { foreignKey: 'position' , as: 'positionData'})
      AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData'})
      AllCode.hasMany(models.Schedule, { foreignKey: 'timeKey', as: 'timeData'})
      AllCode.hasMany(models.Doctor_infor, { foreignKey: 'priceKey', as: 'priceData'})
      AllCode.hasMany(models.Doctor_infor, { foreignKey: 'paymentKey', as: 'paymentData'})
      AllCode.hasMany(models.Doctor_infor, { foreignKey: 'provinceKey', as: 'provinceData'})
    }
  };
  AllCode.init({
    key: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AllCode',
  });
  return AllCode;
};