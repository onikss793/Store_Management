const { Employee } = require('../models');

const selectEmployeesByStoreId = (store_id) => {
	return Employee.findAll({ where: { store_id }});
}

const insertEmployee = (data) => {
	return Employee.create(data);
};

module.exports = { insertEmployee, selectEmployeesByStoreId };