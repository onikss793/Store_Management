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
			// superuser를 등록하기 위해, 일종의 Admin처럼 우리의 비밀번호를 이용해 등록할 수 있도록 하자.
			const data = request.body['data'];

			const password = process.env.SECRET_KEY;

			if (data['password'] !== password) {
				return utils.makeError({
					statusCode: 401,
					name: 'Unauthorized',
					message: 'You are not an Admin'
				});
			}

			const database = createDatabase();
			const storeService = new StoreService(database);

			transaction = await database.transaction();
			const superuser = data['store'];
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
