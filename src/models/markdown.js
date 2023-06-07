'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Markdown.belongsTo(models.User, {foreignKey: 'doctorId', targetKey: 'id', as: 'doctorInformation'})
    }
  };
  Markdown.init({
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    contentHTML: DataTypes.TEXT,
    contentMarkdown: DataTypes.TEXT,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Markdown',
    tableName: 'Markdowns'
  });
  //console.log("=========================test markdown : ", Markdown.tableName, sequelize.models.Markdown,  Markdown === sequelize.models.Markdown);
  return Markdown;
};