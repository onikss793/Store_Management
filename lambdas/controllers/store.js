const Controller = require('./controller');
const { StoreService, AccountService } = require('../../services');
const utils = require('../utils');

class StoreController extends Controller {
	storeService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['brand_id', 'store_name', 'password', 'is_admin']);
		this.setService('storeService', StoreService);
		this.setService('accountService', AccountService);
	}

	post = async request => {
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
			return utils.throwError(err);
		}
	};

	get = async request => {
		try {
			let data;

			if (request.resourceId) { // /store/1 => resourceId가 있는 경우
				data = await this.getSpecificStoreData(request);
			} else if (request.isAdmin) { // /store => 모든 매장 목록일 경우
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
			return utils.throwError(err);
		}
	};

	delete = async request => {
		let transaction;

		try {
			const { resourceId, accountId, isAdmin } = request;
			const storeId = utils.getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin);

			transaction = await this.database.transaction();
			await this.storeService.deleteStore(storeId, transaction);
			await transaction.commit();

			return utils.response({
				body: { success: true }
			});
		} catch (e) {
			if (transaction) await transaction.rollback();
			return utils.throwError(e);
		}
	};

	async getSpecificStoreData(request) {
		const { resourceId, accountId, isAdmin } = request;
		const storeId = utils.getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin);

		if (storeId) {
			return await this.storeService.getStoreById(storeId);
		} else {
			return null;
		}
	}
}

module.exports = () => new StoreController();
