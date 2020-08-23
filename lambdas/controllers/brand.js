const Controller = require('./controller');
const { BrandService } = require('../../services');
const utils = require('../utils');

class BrandController extends Controller {
	brandService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['brand_name']);
		this.setService('brandService', BrandService);
	}

	get = async () => {
		try {
			const brandList = await this.brandService.getBrandList();

			return utils.response({
				body: { data: brandList }
			});
		} catch (err) {
			return utils.throwError(err);
		}
	};

	post = async request => {
		let transaction;

		try {
			this.bodyCheck(request);
			const brandData = request.body;

			transaction = await this.database.transaction();
			await this.brandService.createBrand(brandData, transaction);
			await transaction.commit();

			return utils.response({
				body: { success: true }
			});
		} catch (err) {
			if (transaction) await transaction.rollback();
			return utils.throwError(err);
		}
	};

	delete = async request => {
		let transaction;

		try {
			const resourceId = request.resourceId;
			const accountId = request.storeId;
			const isAdmin = request.isAdmin;
			const brandId = utils.getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin);

			transaction = await this.database.transaction();
			await this.brandService.deleteBrand(brandId, transaction);
			await transaction.commit();

			return utils.response({
				body: { success: true }
			});
		} catch (e) {
			if (transaction) await transaction.rollback();
			return utils.throwError(e);
		}
	};
}

module.exports = () => new BrandController();
