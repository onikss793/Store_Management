const { Sequelize } = require('sequelize');
const models = require('../models');
const { DATABASE, USERNAME, PASSWORD, host } = require('../config/db');
const STAGE = process.env.SM_STAGE || 'test';

class Database {
	constructor() {
		this.sequelize = this._setSequelize();
		this.setModels();
	}

	async connect(force = false) {
		try {
			await this.sequelize.authenticate();
			await this.sequelize.sync({ force });
			console.info('DB Loaded: ', this.sequelize.config.database);
		} catch (err) {
			console.info('DB Loading Error: ', err);
			throw err;
		}
	}

	async force() {
		try {
			await this.sequelize.authenticate();
			await this.sequelize.sync({ force: true });
			console.info('DB Forced: ', this.sequelize.config.database);
		} catch (err) {
			console.info('DB Force Error: ', err);
			throw err;
		}
	}

	async alter() {
		try {
			await this.sequelize.authenticate();
			await this.sequelize.sync({ alter: true });
			console.info('DB Altered: ', this.sequelize.config.database);
		} catch (err) {
			console.info('DB Alter Error: ', err);
			throw err;
		}
	}

	async close() {
		try {
			await this.sequelize.close();
		} catch (err) {
			console.info('DB close ERROR: ', err);
			throw err;
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
		if (STAGE === 'production') {
			return new Sequelize(DATABASE, USERNAME, PASSWORD, {
				host,
				port: 3306,
				logging: false,
				dialect: 'mysql',
				dialectOptions: {
					ssl: 'Amazon RDS'
				},
				pool: {
					max: 10,
					min: 0,
					idle: 10000
				}
			});
		}

		return new Sequelize(this._getDBName(), 'root', '1', {
			host: 'localhost',
			port: 3306,
			logging: false,
			dialect: 'mysql',
			pool: {
				max: 10,
				min: 0,
				idle: 5000
			}
		});
	}

	_getDBName() {
		switch (STAGE) {
			case 'test': {
				return 'store_management_test';
			}
			case 'dev': {
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

function createDatabase() {
	return new Database().setModels();
}

module.exports = { createDatabase };
