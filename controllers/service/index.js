const serviceDao = require('../../dao').service;

const createService = async (req, res, next) => {
	try {
		const store_id = req.store_id;
		const { service_name, color } = req.body;

		const data = {
			service_name,
			color,
			store_id
		};

		await serviceDao.insertService(data);

		res.status(200).json();
	} catch(err) {
		next(err);
	}
};

module.exports = { createService };