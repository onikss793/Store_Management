const Sequelize = require('Sequelize');
const Database = require('database');

const db = new Database(process.env.NODE_ENV);

module.exports = (...names) => {
    return names.reduce((acc, curr) => {
        return {
            ...acc,
            [curr]: require(`./${curr}`)(Sequelize, db)
        };
    }, {});
};
