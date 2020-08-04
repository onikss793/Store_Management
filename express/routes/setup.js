const { Dao } = require('../../dao');
const { database } = require('../database');
const { auth } = require('../../config');
const env = process.env.NODE_ENV;

const storeDao = new Dao(database, 'Store');

module.exports = async (req, res, next) => {
	let transaction;

	try {
		const { SUPERUSER } = auth;
		let data;

		if (env === 'production') {
			data = SUPERUSER.prod;
		}
		if (env === 'lambda') {
			data = SUPERUSER.dev;
		}
		if (env === 'dev') {
			data = SUPERUSER.dev;
		}

		transaction = await database.transaction();
		const result = await storeDao.upsertOne(data, transaction);
		await transaction.commit();

		res.status(200).send(result);
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};
