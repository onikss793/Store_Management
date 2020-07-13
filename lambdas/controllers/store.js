const Controller = require('./controller');
const { StoreService, AccountService } = require('../services');
const utils = require('../utils');

class StoreController extends Controller {
	storeService;
	accountService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['brand_id', 'store_name', 'password', 'is_admin']);
		this.setService('storeService', StoreService);
		this.setService('accountService', AccountService);
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
			const resourceId = request.resourceId;
			const accountId = request.accountId;
			const isAdmin = request.isAdmin;
			const storeId = utils.getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin);

			let data;
			if (storeId) {
				data = await this.storeService.getStoreById(storeId);
			}
			if (isAdmin) {
				data = await this.storeService.getAllStores();
			}

			if (!data) {
				return utils.makeError({
					statusCode: 403,
					name: 'Forbidden',
					message: 'You have No Access'
				});
			}

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
