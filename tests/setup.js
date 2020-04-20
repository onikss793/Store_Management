const db = require('database'),
	bcrypt = require('bcrypt'),
	app = require('../app'),
	dao = require('../dao');

const request = require('supertest')(app);

const load = async () => {
	try {
		await db.authenticate()
			.then(() =>
				console.log('TEST_DB Connected to: ', db.config.database)
			)
			.catch(err => console.error('TEST_DB Connection Error:', err));
		await db.sync({ force: true });
	} catch (err) {
		console.log('Setup Error: ', err);
	}
};

const teardown = async () => {
	try {
		await db.sync({ force: true });
	} catch (err) {
		console.log('Setup Error: ', err);
	}
};

const getStoreData = async () => {
	const store_data = {
		store_name: '선릉 1호점',
		password  : '1111',
		brand_id  : 1,
		is_admin  : false
	};
	store_data.password = await bcrypt.hash(store_data.password, Number(process.env.SALT_ROUNDS));

	return store_data;
};

const loadStoreList = async () => {
	const store_data = [...require('./stores.json')];

	const store_list = await Promise.all(store_data.map(async store => {
		store.password = await bcrypt.hash(store.password, Number(process.env.SALT_ROUNDS));

		return store;
	}));

	for await (const store of store_list) {
		await dao.store.insertStore(store);
	}
};

const login = async () => {
	const store_data = {
		store_name: 'test',
		password  : 'test',
		brand_id  : 1,
		is_admin  : true
	};
	store_data.password = await bcrypt.hash(store_data.password, Number(process.env.SALT_ROUNDS));
	await dao.store.insertStore(store_data);

	const response = await request.post('/account').send({ name: 'test', password: 'test' }).then(res => res.toJSON());

	return JSON.parse(response.text).token;
};

module.exports = {
	load,
	teardown,
	request,
	getStoreData,
	loadStoreList,
	login
};