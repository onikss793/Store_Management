const clientDao = require('../../dao').client,
	utils = require('../../utils'),
	{ getResponseForList } = require('./helper');

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
		const { client_name, phone_number, info } = req.body;

		const data = {
			client_name,
			phone_number,
			info,
			store_id
		};

		await clientDao.insertClient(data);

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

module.exports = { createClient, getClientListByStoreId };