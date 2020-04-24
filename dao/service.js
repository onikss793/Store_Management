const { Service } = require('../models');

const insertService = (data) => {
	return Service.create(data);
};

module.exports = { insertService };