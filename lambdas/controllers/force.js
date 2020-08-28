const utils = require('../utils');
const { createDatabase } = require('../database');
const { StoreService } = require('../../services');

module.exports = {
	get: async () => {
		try {
			const database = createDatabase();
			await database.force();

			return utils.response({
				body: {
					success: true
				}
			});
		} catch (e) {
			return utils.throwError(e);
		}
	},
	post: async request => {
		let transaction;

		try {
			const data = request.body['data'];

			const password = process.env.SECRET_KEY;

			if (data['password'] !== password) {
				return utils.makeError({
					statusCode: 401,
					name: 'Unauthorized',
					message: 'You are not an Admin'
				});
			}

			const superuser = data['store'];

			const database = createDatabase();
			const storeService = new StoreService(database);

			transaction = await database.transaction();
			await storeService.createStore(superuser, transaction);
			await transaction.commit();

			return utils.response({
				body: {
					message: 'success'
				}
			});
		} catch (e) {
			if (transaction) await transaction.rollback();
			return utils.throwError(e);
		}
	}
};
