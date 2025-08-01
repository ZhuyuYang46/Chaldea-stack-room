'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Novel, {
        foreignKey: 'novelId',
        as: 'Novel'             // 这样在 include 时用 f.Novel 拿到实例
      });

    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    novelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};