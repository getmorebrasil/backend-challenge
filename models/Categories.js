module.exports = (sequelize, DataType) => {
  const Categories = sequelize.define('Categories', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    childrenId: {
      type: DataType.INTEGER,
      foreignKey: true,
    }
  })
  return Categories;
};