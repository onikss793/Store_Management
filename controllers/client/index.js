const dao = require('../../dao');

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

		await dao.client.insertClient(data);

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

module.exports = { createClient };