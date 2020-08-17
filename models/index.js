const initModels = require('./initModels');
module.exports = sequelize => initModels({
	sequelize,
	models: [
		'Brand',
		'Client',
		'Employee',
		'Reservation',
		'Service',
		'Store',
		'Vacation'
	]
});
