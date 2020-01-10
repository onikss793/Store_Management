const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    'mysql://root:1@localhost/store_management_test',
    {
      logging: false
    }
  );
} else if (process.env.NODE_ENV === 'dev') {
  sequelize = new Sequelize(
    'mysql://root:1@localhost/store_management_dev',
    {
      logging: false
    }
  );
} else {
  sequelize = new Sequelize(
    'mysql://root:1@localhost/store_management',
    { logging: false }
  );
}

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = sequelize;
