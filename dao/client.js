const { Client } = require('../models');

const selectClientsByStoreId = (store_id) => {
	return Client.findAll({ where: { store_id }})
}

const insertClient = (data) => {
	return Client.create(data);
};

module.exports = { insertClient, selectClientsByStoreId };
