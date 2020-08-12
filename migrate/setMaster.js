const { StoreService } = require('../services');

module.exports = async (database) => {
	let transaction;

	try {
		const storeService = new StoreService(database);
		const master = {
			store_name: 'master',
			password: 'password',
			is_admin: true,
			brand_id: 1
		};

		transaction = await database.transaction();
		await storeService.createStore(master, transaction);
		await transaction.commit();
		console.log('[[ SET MASTER ]]: success');
		return true;
	} catch (e) {
		if (transaction) await transaction.rollback();
		throw e;
	}
};
