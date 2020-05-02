const clientDao = require('../../dao').client,
	utils = require('../../utils'),
	{ getResponseForList } = require('./helper'),
	db = require('../../database');

const getClientListByStoreId = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const data = await clientDao.selectClientsByStoreId(store_id)
		                            .then(d => d.length && d.map(o => o.toJSON()));
		const response = getResponseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createClient = async (req, res, next) => {
	try {
		const store_id = req.store_id;
		const properties = ['client_name', 'phone_number', 'info'];
		!utils.checkRequest(req, properties) && next(utils.throwError(400, 'Bad Request'));

		const { client_name, phone_number, info } = req.body;
		const data = {
			client_name,
			phone_number,
			info,
			store_id
		};

		await db.transaction(async t => {
			await clientDao.insertClient(data, t);
		});

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

const updateClient = async (req, res, next) => {
	try {
		const data = req.body;
		const client_id = req.params.client_id;

		await db.transaction(async t => {
			await clientDao.updateClient(client_id, { ...data }, t);
		});

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

module.exports = { createClient, getClientListByStoreId, updateClient };