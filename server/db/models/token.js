import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    deviceId: {
      allowNull: false,
      type: DataTypes.STRING(36),
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    timestamps: false,
    hooks: {
      beforeSave: async (t) => {
        const { userId } = jwt.decode(t.token);
        if (!userId) {
          throw new Error('User ID is empty');
        }
        t.userId = userId; // eslint-disable-line
      },
    },
  });
  Token.associate = (models) => {
    Token.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return Token;
};
