const { Employee, Vacation } = require('../models');

const selectEmployeesByStoreId = (store_id) => {
	return Employee.findAll({ where: { store_id } });
};

const insertEmployee = (data) => {
	return Employee.create(data);
};

const insertVacation = (data, transaction) => {
	return Vacation.create(data, { transaction });
};

module.exports = { insertEmployee, selectEmployeesByStoreId, insertVacation };