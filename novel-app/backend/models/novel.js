'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Novel.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    summary: DataTypes.TEXT,
    coverImageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Novel',
  });
  return Novel;
};