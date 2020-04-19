const { Store } = require('../models');

const selectStore = (index) => {
	return Store.findOne({ where: { ...index } });
}

const insertStore = (data) => {
	return Store.create(data);
}

const selectStoreList = () => {
	const attributes = ['id', 'store_name', 'brand_id', 'is_admin'];

	return Store.findAll({ order: ['brand_id'], attributes });
}

module.exports = { selectStore, insertStore, selectStoreList };