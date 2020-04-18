const { Store } = require('../models');

const selectStore = (index) => {
	return Store.findOne({ where: { ...index }});
}

const insertStore = (data) => {
	return Store.create(data);
}

module.exports = { selectStore, insertStore };