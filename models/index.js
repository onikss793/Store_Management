const initModels = require('./initModels');
module.exports = sequelize => initModels({
	sequelize,
	models: [
		'Brand',
		'Employee',
		'Reservation',
		'Store',
		'Vacation'
	]
});
