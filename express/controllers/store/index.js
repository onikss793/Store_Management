const utils = require('../../utils');
const { database } = require('../../database');
const { Dao, query } = require('../../../dao');

const storeDao = new Dao(database, 'Store');

const createStore = async (req, res, next) => {
	let transaction;
	const properties = [
		'store_name',
		'password',
		'brand_id'
	];

	try {
		if (utils.checkRequest(req, properties)) {
			const data = req.body;
			data.password = utils.cryptonite(data.password);

			transaction = await database.transaction();
			await storeDao.insertOne(data, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch (err) {
		if (transaction) {
			await transaction.rollback();
		}
		next(err);
	}
};

const storeList = async (req, res, next) => {
	try {
		const { selectStoreList } = query.store;
		const stores = await database.query(selectStoreList());

		res.status(200).json(stores);
	} catch (err) {
		next(err);
	}
};

module.exports = { createStore, storeList };
