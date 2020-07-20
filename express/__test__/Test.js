const { database, sequelize } = require('../database');
const { cryptonite } = require('../utils');
const { Dao } = require('../../dao');
const { forTest } = require('../app');
const request = require('supertest')(forTest());

class Test {
	constructor() {
		this.database = database;
		this.sequelize = sequelize;
		this.session = new Session();
		this.setDao();
	}

	setDao() {
		this.brandDao = new Dao(this.database, 'Brand');
		this.clientDao = new Dao(this.database, 'Client');
		this.employeeDao = new Dao(this.database, 'Employee');
		this.reservationDao = new Dao(this.database, 'Reservation');
		this.serviceDao = new Dao(this.database, 'Service');
		this.storeDao = new Dao(this.database, 'Store');
	}

	async loadDB() {
		await this.sequelize.authenticate();
		await this.sequelize.sync({ force: true });
		console.info('DB Loaded!');
	}

	async tearDown() {
		await this.sequelize.sync({ force: true });
		await this.sequelize.close();
		console.info('Tear Down!');
	}

	async login() {
		await this.session.login();
	}

	async get(url) {
		return request.get(url).set('Authorization', this.session.token)
		              .then(res => res.toJSON());
	}

	async post(url, data) {
		return request.post(url).set('Authorization', this.session.token)
		              .send(data).then(res => res.toJSON());
	}

	async bearCall(url, method, token, data) {
		if (method === 'GET') {
			return request.get(url).set('Authorization', token).then(res => res.toJSON());
		}
		if (method === 'POST') {
			return request.post(url).set('Authorization', token).send(data).then(res => res.toJSON());
		}
		if (method === undefined) {
			throw new Error('NO METHOD!');
		}
	}

	async loadStoreList() {
		try {
			const store_data = Array.from(require('./stores.json'));
			const store_list = await Promise.all(
				store_data.map(async ({ store_name, brand_id, is_admin, password }) => {
					const hashed_password = cryptonite(password);

					return {
						password: hashed_password,
						store_name,
						brand_id,
						is_admin
					};
				}));
			for await (const store of store_list) {
				await this.storeDao.insertOne(store);
			}
			console.info('Stores Loaded!');
		} catch (err) {
			console.trace('Load StoreList Error: ', err);
		}
	}

	async loadBrandList() {
		try {
			const brand_list = Array.from(require('./brands.json'));

			for await (const brand of brand_list) {
				await this.brandDao.insertOne(brand);
			}
			console.info('Brands Loaded!');
		} catch (err) {
			console.trace('Load BrandList Error: ', err);
		}
	}

	async loadEmployeeList() {
		try {
			const employeeList = Array.from(require('./employees.json'));

			for await (const employee of employeeList) {
				await this.employeeDao.insertOne(employee);
			}
			console.info('Employee Loaded!');
		} catch (err) {
			console.trace('Load EmployeeList Error', err);
		}
	}

	async loadService() {
		try {
			const serviceList = Array.from(require('./service.json'));

			for await (const service of serviceList) {
				await this.serviceDao.insertOne(service);
			}
			console.info('Service Loaded!');
		} catch (err) {
			console.trace('Load ServiceList Error', err);
		}
	}

	async loadClient() {
		try {
			const clientList = Array.from(require('./clients.json'));

			for await (const client of clientList) {
				await this.clientDao.insertOne(client);
			}
			console.info('Client Loaded!');
		} catch (err) {
			console.trace('Load Client Error', err);
		}
	}

	async loadReservation() {
		try {
			const reservationList = Array.from(require('./reservation.json'));

			for await (const reservation of reservationList) {
				await this.reservationDao.insertOne(reservation);
			}
			console.info('Reservation Loaded!');
		} catch (err) {
			console.trace('Load Reservation Error', err);
		}
	}
}

class Session {
	constructor() {
		this.token = '';
	}

	async login() {
		try {
			const { store_name: name, password } = Array.from(require('./stores.json'))[0];
			const response = await request.post('/account')
			                              .send({ name, password }).then(res => res.toJSON());

			this.token = JSON.parse(response.text).token;
			console.info('Logged In!');
		} catch (err) {
			console.trace('Login Error: ', err);
		}
	}
}

module.exports = Test;
