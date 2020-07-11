const Controller = require('./controller');
const { StoreService } = require('../services');
const utils = require('../utils');

class StoreController extends Controller {
	storeService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['brand_id', 'store_name', 'password', 'is_admin']);
		this.setService('storeService', StoreService);
	}

	post = async (request) => {
		let transaction;

		try {
			this.bodyCheck(request);
			const storeData = request.body;

			transaction = await this.database.transaction();
			await this.storeService.createStore(storeData, transaction);
			await transaction.commit();

			return utils.response({
				body: { success: true }
			});
		} catch (err) {
			if (transaction) await transaction.rollback();
			console.error(err);
			return utils.throwError(err);
		}
	};

	get = async (request) => {
		try {
			const storeId = request.resourceId;
			const data = storeId
				? await this.storeService.getStoreById(storeId)
				: await this.storeService.getAllStores();

			return utils.response({
				body: { data }
			});
		} catch (err) {
			console.error(err);
			return utils.throwError(err);
		}
	};
}

module.exports = () => new StoreController();
