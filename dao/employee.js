const { Employee, Vacation } = require('../models');

const selectEmployeesByStoreId = (store_id) => {
	return Employee.findAll({ where: { store_id }});
}

const insertEmployee = (data) => {
	return Employee.create(data);
};

const insertVacation = (data) => {
	return Vacation.create(data);
};

module.exports = { insertEmployee, selectEmployeesByStoreId, insertVacation };