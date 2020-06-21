const { getResponseForList } = require('./helper');
const utils = require('../../utils');
const { database } = require('../../database');
const { Dao, query } = require('../../dao');

const serviceDao = new Dao(database, 'Service');

const getServiceListByStoreId = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const data = await serviceDao.selectAll({ store_id });

		const response = getResponseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createService = async (req, res, next) => {
	let transaction;
	const properties = [
		'service_name',
		'color'
	];

	try {
		if (utils.checkRequest(req, properties)) {
			const store_id = req.store_id;
			const { service_name, color } = req.body;

			const data = {
				service_name,
				color,
				store_id
			};

			transaction = await database.transaction();
			await serviceDao.insertOne(data, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};

module.exports = { createService, getServiceListByStoreId };
