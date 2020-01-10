const Sequelize = require('sequelize');

let sequelize;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('test_database', DB_USER, DB_PASSWORD, {
    dialect: 'mysql'
  });
} else {
  sequelize = new Sequelize('store_management', DB_USER, DB_PASSWORD, {
    dialect: 'mysql'
  });
}

module.exports = sequelize;
