const { Employee } = require('../models');

const insertEmployee = (data) => {
	return Employee.create(data);
};

module.exports = { insertEmployee };