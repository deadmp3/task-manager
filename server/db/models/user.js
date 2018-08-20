import encrypt from '../../lib/secure';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: {
        args: true,
        msg: 'A user with this e-mail already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid e-mail format',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.VIRTUAL,
      set: function set(value) {
        this.setDataValue('passwordDigest', encrypt(value));
        this.setDataValue('password', value);
        return value;
      },
      validate: {
        len: {
          args: [3, +Infinity],
          msg: 'Your password should be at least 3 symbols long',
        },
      },
    },
    passwordDigest: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your first name',
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your last name',
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeValidate: (user) => {
        user.email = user.email || ''; // eslint-disable-line
        user.password = user.password || ''; // eslint-disable-line
        user.firstName = user.firstName || ''; // eslint-disable-line
        user.lastName = user.lastName || ''; // eslint-disable-line
      },
      beforeSave: (user) => {
        user.fullName = `${user.firstName} ${user.lastName}`; // eslint-disable-line
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Token, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return User;
};
