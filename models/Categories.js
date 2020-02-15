module.exports = (sequelize, DataType) => {
    const Categories = sequelize.define('Categories', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    return Categories;
  };