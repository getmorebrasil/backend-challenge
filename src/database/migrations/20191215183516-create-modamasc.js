'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Modamasc', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      children_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Modamasc');
  }
};
