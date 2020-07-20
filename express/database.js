const { Sequelize } = require('sequelize');
const { DATABASE, USERNAME, PASSWORD, host } = require('../config/db');
const models = require('../models');
const env = process.env.NODE_ENV;

class Database {
	constructor() {
		this.sequelize = this._setSequelize();
		this.setModels();
	}

	async connect(force) {
		try {
			await this.sequelize.authenticate();
			await this.sequelize.sync({ force });
			console.info('DB Loaded: ', this.sequelize.config.database);
		} catch (err) {
			console.info('DB Loading Error: ', err);
		}
	}

	getSequelize() {
		return this.sequelize;
	}

	setModels() {
		this.models = models(this.getSequelize());
		return this;
	}

	_setSequelize() {
		const standard = 'lambda';

		if (env !== standard) {
			return new Sequelize(this._getDBName(), 'root', '1', {
				host: 'localhost',
				port: 3306,
				logging: false,
				dialect: 'mysql'
			});
		}

		if (env === standard) {
			return new Sequelize(DATABASE, USERNAME, PASSWORD, {
				host,
				port: 3306,
				logging: false,
				dialect: 'mysql',
				dialectOptions: {
					ssl: 'Amazon RDS'
				}
			});
		}

		if (env === 'production') {
			//
		}
	}

	_getDBName() {
		switch (env) {
			case 'test': {
				return 'store_management_test';
			}
			case 'dev': {
				return 'store_management_dev';
			}
			case 'lambda': {
				return 'store_management_dev';
			}
			case undefined: {
				return 'store_management_test';
			}
		}
	}

	async query(query) {
		const transaction = await this.transaction();

		try {
			const [result] = await this.sequelize.query(query);
			await transaction.commit();
			return result;
		} catch (err) {
			if (transaction) await transaction.rollback();
			throw err;
		}
	}

	transaction() {
		return this.sequelize.transaction();
	}
}

const database = new Database().setModels();
const sequelize = database.getSequelize();

module.exports = { sequelize, database, Database };
