module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull:false,
      },

      /* provider por padrão vai ser false,
      quer dizer que todos os usuários serão clientes por padrão
      e não prestadores de serviço. */
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:false
      }
    })

  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};
