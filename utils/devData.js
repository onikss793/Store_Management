const bcrypt = require('bcrypt'),
	dao = require('../dao');

const storeData = async () => {
	const password = await bcrypt.hash('password', Number(process.env.SALT_ROUNDS));

	const data = {
		store_name: 'test',
		brand_id: 1,
		is_admin: true,
		password
	};
	await dao.store.insertStore(data);
};

module.exports = { storeData };