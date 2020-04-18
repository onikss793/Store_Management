const initModels = require('models/initModels'),
	models = initModels(
		'Brand',
		'Color',
		'Employee',
		'Reservation',
		'Service',
		'Store',
		'Client',
		'Vacation'
	);

// models.Brand.hasMany(models.Store);
//
// models.Color.hasOne(models.Service);
//
// models.Store.hasMany(models.Employee);
//
// models.Employee.hasMany(models.Reservation);
// models.Service.hasMany(models.Reservation);
// models.Store.hasMany(models.Reservation);

module.exports = {
	...models
};
