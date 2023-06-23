'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.AllCode, {foreignKey: 'position', targetKey: 'key', as: 'positionData'})
      User.belongsTo(models.AllCode, {foreignKey: 'gender', targetKey: 'key', as: 'genderData'})

      User.hasOne(models.Markdown, {foreignKey: 'doctorId', as: 'doctorInformation'})
      User.hasOne(models.Doctor_infor, {foreignKey: 'doctorId', as: 'doctorInforMore'})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    position: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};