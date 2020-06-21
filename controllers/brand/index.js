const utils = require('../../utils');
const { responseForList } = require('./helper');
const { Dao, query } = require('../../dao');
const { database } = require('../../database');

const brandDao = new Dao(database, 'Brand');

const getBrandList = async (req, res, next) => {
	try {
		const data = await brandDao.selectAll().then(d => d.length && d.map(o => o.toJSON()));
		const response = responseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createBrand = async (req, res, next) => {
	let transaction;

	try {
		if (!utils.checkRequest(req, ['brand_name'])) {
			next(utils.throwError(400, 'Bad Request'));
		}
		const { brand_name } = req.body;
		const data = { brand_name };

		transaction = await database.transaction();
		await brandDao.insertOne(data, transaction);
		await transaction.commit();

		res.status(200).json(utils.postResponse());
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};

module.exports = { createBrand, getBrandList };
