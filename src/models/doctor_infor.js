'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_infor.belongsTo(models.User, {foreignKey: 'doctorId', targetKey: 'id', as: 'doctorInforMore'})
      Doctor_infor.belongsTo(models.AllCode, {foreignKey: 'priceKey', targetKey: 'key', as: 'priceData'})
      Doctor_infor.belongsTo(models.AllCode, {foreignKey: 'paymentKey', targetKey: 'key', as: 'paymentData'})
      Doctor_infor.belongsTo(models.AllCode, {foreignKey: 'provinceKey', targetKey: 'key', as: 'provinceData'})
    }
  };
  Doctor_infor.init({
    doctorId: DataTypes.INTEGER,
    priceKey:DataTypes.STRING,
    provinceKey: DataTypes.STRING,
    paymentKey: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor_infor',
    //tableName: 'Doctor_infor',
    freezeTableName: true, // setting to matching table name
  });
  return Doctor_infor;
};