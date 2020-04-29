const { Service } = require('../models');

const selectServicesByStoreId = (store_id) => {
	return Service.findAll({ where: { store_id }});
}

const insertService = (data) => {
	return Service.create(data);
};

module.exports = { selectServicesByStoreId, insertService };