module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
    },
    passwordDigest: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING(50),
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(50),
    },
    fullName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }).then(() => queryInterface.addIndex('Users', ['email'])),
  down: queryInterface => queryInterface.dropTable('Users'),
};
