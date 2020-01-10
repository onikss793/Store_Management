const Sequelize = require('Sequelize');
const db = require('database');

module.exports = (...names) => {
  return names.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: require(`../models/${curr}`)(Sequelize, db)
    };
  }, {});
};
