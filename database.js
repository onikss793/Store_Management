const { Sequelize } = require('sequelize');
const { DATABASE, USERNAME, PASSWORD, host } = require('./config/db');

const returnSequelize = () => {
	try {
		if (process.env.NODE_ENV !== 'lambda') {
			return new Sequelize(`mysql://root:1@localhost/${ getDbName(process.env.NODE_ENV) }`, { logging: false });
		}
		if (process.env.NODE_ENV === 'lambda') {
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
	} catch (err) {
		return err;
	}
};

const getDbName = (env) => {
	switch (env) {
		case 'test': {
			this.name = 'store_management_test';
			break;
		}

		case 'dev': {
			this.name = 'store_management_dev';
			break;
		}
		case 'production': {
			this.name = 'store_management';
			break;
		}
	}

	return this.name;
};

module.exports = returnSequelize();
