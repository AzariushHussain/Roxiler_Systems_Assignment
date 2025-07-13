const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./schemas/userSchema')(sequelize, DataTypes);
db.Store = require('./schemas/storeSchema')(sequelize, DataTypes);
db.Rating = require('./schemas/ratingSchema')(sequelize, DataTypes);

Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;