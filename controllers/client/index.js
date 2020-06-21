const utils = require('../../utils');
const { getResponseForList } = require('./helper');
const { database } = require('../../database');
const { Dao, query } = require('../../dao');

const clientDao = new Dao(database, 'Client');

const getClientListByStoreId = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const data = await clientDao.selectAll({ store_id })
		                            .then(d => d.length && d.map(o => o.toJSON()));
		const response = getResponseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createClient = async (req, res, next) => {
	let transaction;

	try {
		const store_id = req.store_id;
		const properties = ['client_name', 'phone_number', 'info'];

		if (utils.checkRequest(req, properties)) {
			const { client_name, phone_number, info } = req.body;
			const data = {
				client_name,
				phone_number,
				info,
				store_id
			};

			transaction = await database.transaction();
			await clientDao.insertOne(data, transaction);
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

const updateClient = async (req, res, next) => {
	let transaction;

	try {
		const data = req.body;
		const client_id = req.params.client_id;

		transaction = await database.transaction();
		await clientDao.updateOne({ id: client_id }, { ...data }, transaction);
		await transaction.commit();

		res.status(200).json(utils.postResponse());
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};

module.exports = { createClient, getClientListByStoreId, updateClient };
