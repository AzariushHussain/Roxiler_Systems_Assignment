module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(400)
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'store_owner'),
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Store, { foreignKey: 'owner_id' });
    User.hasMany(models.Rating, { foreignKey: 'user_id' });
  };

  return User;
};
