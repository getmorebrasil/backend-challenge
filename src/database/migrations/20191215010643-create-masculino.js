'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('masculino', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      childrenIds: {
        type: Sequelize.ENUM(''),
        allowNull: true,
        defaultValue: null
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('masculino');
  }
};
