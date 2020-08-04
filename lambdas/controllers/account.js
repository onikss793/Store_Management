const Controller = require('./controller');
const { AccountService } = require('../../services');
const utils = require('../utils');

class AccountController extends Controller {
	accountService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['store_name', 'password']);
		this.setService('accountService', AccountService);
	}

	onlyAdmin = request => {
		if (!request.isAdmin) {
			return utils.makeError({
				statusCode: 401,
				name: 'Unauthorized',
				message: 'Authorization Failed'
			});
		}
	};

	authorize = async request => {
		const authFailed = await this.accountService.authorize(request);

		if (authFailed) {
			return authFailed;
		}
	};

	post = async request => {
		let transaction;

		try {
			this.bodyCheck(request);
			const credentials = request.body;

			transaction = await this.database.transaction();
			const { storeId } = await this.accountService.login(credentials, transaction);

			if (!storeId) {
				const error = utils.makeError({
					statusCode: 401,
					name: 'Unauthorized',
					message: 'Authorization Failed'
				});

				await transaction.rollback();
				return utils.throwError(error);
			}

			const storeData = await this.accountService.getStoreById(storeId);
			const accessToken = await this.accountService.getAccessToken(storeId);
			await transaction.commit();

			return utils.response({
				body: {
					data: {
						accessToken: accessToken,
						...storeData
					}
				}
			});
		} catch (err) {
			if (transaction) await transaction.rollback();
			console.error(err);
			return utils.throwError(err);
		}
	};
}

module.exports = () => new AccountController();