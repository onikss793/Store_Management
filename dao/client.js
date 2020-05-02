const { Client } = require('../models');

const selectClientsByStoreId = (store_id) => {
	return Client.findAll({ where: { store_id } });
};

const insertClient = (data, transaction) => {
	return Client.create(data, { transaction });
};

const updateClient = (client_id, data, transaction) => {
	return Client.update({ ...data }, { where: { id: client_id }, transaction });
};

module.exports = { insertClient, selectClientsByStoreId, updateClient };
