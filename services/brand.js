const { Dao } = require('../dao');

class BrandService {
	constructor(database) {
		this.database = database;
		this.brandDao = new Dao(database, 'Brand');
	}

	async createBrand(brandData, transaction) {
		return this.brandDao.insertOne(brandData, transaction);
	}

	async getBrandList() {
		const attributes = ['id', 'brand_name'];
		return this.brandDao.selectAll(null, attributes);
	}
}

module.exports = BrandService;
