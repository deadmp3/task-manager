module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tokens', {
    deviceId: {
      allowNull: false,
      type: Sequelize.STRING(36),
      primaryKey: true,
    },
    token: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }).then(() => queryInterface.addIndex('Tokens', ['userId'])),
  down: queryInterface => queryInterface.dropTable('Tokens'),
};
