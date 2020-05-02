const serviceDao = require('../../dao').service,
	{ getResponseForList } = require('./helper'),
	db = require('../../database');

const getServiceListByStoreId = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const data = await serviceDao.selectServicesByStoreId(store_id)
		                             .then(d => d.length && d.map(o => o.toJSON()));
		const response = getResponseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createService = async (req, res, next) => {
	try {
		const store_id = req.store_id;
		const { service_name, color } = req.body;

		const data = {
			service_name,
			color,
			store_id
		};

		await db.transaction(async t => {
			return await serviceDao.insertService(data, t);
		});

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

module.exports = { createService, getServiceListByStoreId };