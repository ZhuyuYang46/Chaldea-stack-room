module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    novelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'chapters',
    underscored: true,
    timestamps: true
  });

  Chapter.associate = models => {
    Chapter.belongsTo(models.Novel, { foreignKey: 'novel_id' });
  };

  return Chapter;
};
