const { Service } = require('../models');

const selectServicesByStoreId = (store_id) => {
	return Service.findAll({ where: { store_id } });
};

const insertService = (data, transaction) => {
	return Service.create(data, { transaction });
};

module.exports = { selectServicesByStoreId, insertService };