const { Dao, query } = require('../../dao');

class BrandService {
	constructor(database) {
		this.database = database;
		this.brandDao = new Dao(database, 'Brand');
	}

	async createBrand(brandData, transaction) {
		return this.brandDao.upsertOne(brandData, transaction);
	}
}

module.exports = BrandService;