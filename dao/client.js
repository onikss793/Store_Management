const { Client } = require('../models');

const selectClientsByStoreId = (store_id) => {
	return Client.findAll({ where: { store_id } });
};

const insertClient = (data) => {
	return Client.create(data);
};

const updateClient = (client_id, data) => {
	return Client.update({ ...data }, { where: { id: client_id } });
};

module.exports = { insertClient, selectClientsByStoreId, updateClient };
