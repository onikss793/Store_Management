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

	async deleteBrand(brandId, transaction) {
		const index = { id: brandId };
		const properties = ['brand_name'];

		return this.brandDao.deleteOne(index, properties, transaction);
	}
}

module.exports = BrandService;
