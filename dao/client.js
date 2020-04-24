const { Client } = require('../models');

const insertClient = (data) => {
	return Client.create(data);
};

module.exports = { insertClient };