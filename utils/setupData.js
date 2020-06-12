const dao = require('../dao'),
	{ SUPERUSER } = require('../config/auth');
const { dev } = SUPERUSER;

const storeData = async () => {
	const data = {
		...dev
	}

	await dao.store.insertStore(data);
};

module.exports = { storeData };