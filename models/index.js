const initModels = require('./initModels');
module.exports = (sequelize) => initModels({
	sequelize,
	models: [
		'Brand',
		'Color',
		'Employee',
		'Reservation',
		'Service',
		'Store',
		'Client',
		'Vacation'
	]
});
