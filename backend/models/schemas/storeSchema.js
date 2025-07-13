module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,  
      validate: {
        isEmailOrEmpty(value) {
          if (value === null || value === '') return; 
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            throw new Error('Invalid email address');
          }
        }
      }
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    Store.hasMany(models.Rating, { foreignKey:  'store_id' });
  };

  return Store;
};
