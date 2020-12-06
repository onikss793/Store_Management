const utils = require('../../utils');
const { createDatabase } = require('../../database');
const database = createDatabase();
const { AccountService } = require('../../../services');

const login = async (req, res, next) => {
	let transaction;
	try {
		const properties = ['store_name', 'password'];
		if (!utils.checkRequest(req, properties)) {
			throw new Error('BAD_REQUEST');
		}
		transaction = await database.transaction();
		const accountService = new AccountService(database, transaction);
		const { store_name, password } = req.body;

		const { storeId } = await accountService.login({ store_name, password });
		const storeData = await accountService.getStoreById(storeId);
		const token = await accountService.getAccessToken(storeId);

		if (storeId) {
			res.status(200).json({
				token,
				...storeData
			});
		} else {
			throw new Error('AUTHORIZATION_FAILED');
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { login };
