const storeDao = require('../../dao').store,
	utils = require('../../utils'),
	db = require('../../database');

const createStore = async (req, res, next) => {
	try {
		const properties = [
			'store_name',
			'password',
			'brand_id'
		];
		!utils.checkRequest(req, properties) && next(utils.throwError(400, 'Bad Request'));

		const data = req.body;
		data.password = utils.cryptonite(data.password);

		await db.transaction(async t => {
			return await storeDao.insertStore(data, t);
		});

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

const storeList = async (req, res, next) => {
	try {
		const stores = await storeDao.selectStoreList('brand_id');

		res.status(200).json(stores);
	} catch (err) {
		next(err);
	}
};

module.exports = { createStore, storeList };