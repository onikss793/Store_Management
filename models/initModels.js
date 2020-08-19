const { DataTypes } = require('sequelize');

module.exports = ({ sequelize, models }) => {
	return [...models].reduce((acc, curr) => {
		return {
			...acc,
			[curr]: require(`./${curr}`)(DataTypes, sequelize)
		};
	}, {});
};
