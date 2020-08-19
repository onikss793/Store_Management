const { Sequelize, Op } = require('sequelize');
const models = require('../models');
const STAGE = process.env.NODE_ENV;

class Database {
	constructor() {
		this.sequelize = this._setSequelize();
		this.setModels();
	}

	async connect(force = false) {
		await this.sequelize.authenticate();
		await this.sequelize.sync({ force });
		console.info('[[ DB Loaded ]]: ', this.sequelize.config.database);
	}

	async force() {
		await this.sequelize.sync({ force: true });
		console.info('[[ MIGRATE ]]: DB FORCED!', this.sequelize.config.database);
	}

	async alter() {
		await this.sequelize.sync({ alter: true });
		console.info('[[ DB Altered ]]: ', this.sequelize.config.database);
	}

	async close() {
		await this.sequelize.close();
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
			return new Sequelize(process.env.DATABASE,
				process.env.USERNAME,
				process.env.PASSWORD, {
					host: process.env.HOST,
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

		return new Sequelize('store_management_dev', 'root', '1', {
			host: '127.0.0.1',
			port: 33069,
			logging: false,
			dialect: 'mysql',
			dialectOptions: {
				charset: 'utf8mb4'
			},
			pool: {
				max: 10,
				min: 0,
				idle: 5000
			}
		});
	}

	op() {
		return { ...Op };
	}

	async query(query) {
		const transaction = await this.transaction();

		try {
			const [result] = await this.sequelize.query(query);
			await transaction.commit();
			return result;
		} catch (err) {
			if (transaction) {
				await transaction.rollback();
			}
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
