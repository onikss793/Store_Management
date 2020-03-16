const initModels = require('models/initModels');

const models = initModels(
    'Superuser',
    'Brand',
    'Color',
    'Employee',
    'Reservation',
    'Service',
    'Store'
);

models.Brand.hasMany(models.Store);

models.Color.hasOne(models.Service);

models.Store.hasMany(models.Employee);

models.Employee.hasOne(models.Reservation);
models.Service.hasOne(models.Reservation);
models.Store.hasOne(models.Reservation);

module.exports = {
    ...models
};
