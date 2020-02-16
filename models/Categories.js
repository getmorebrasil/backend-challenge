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
      childrenId : DataType.ARRAY(DataType.INTEGER)
    });
    return Categories;
  };