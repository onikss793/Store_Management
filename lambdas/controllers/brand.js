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

	post = async (request) => {
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
}

module.exports = () => new BrandController();