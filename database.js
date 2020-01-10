const Sequelize = require('sequelize');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('mysql://root:password@localhost/test_database', {
    logging: false
  });
} else {
  sequelize = new Sequelize(
    'mysql://root:password@localhost/store_management',
    { logging: false }
  );
}

module.exports = sequelize;
