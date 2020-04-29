const brandDao = require('../../dao').brand,
	utils = require('../../utils'),
	{ responseForList } = require('./helper');

const getBrandList = async (req, res, next) => {
	try {
		const data = await brandDao.selectBrands().then(d => d.length && d.map(o => o.toJSON()));
		const response = responseForList(data);

		res.status(200).json(response);
	} catch(err) {
		next(err);
	}
}

const createBrand = async (req, res, next) => {
	try {
		if (!utils.checkRequest(req, ['brand_name'])) {
			next(utils.throwError(400, 'Bad Request'));
		}
		const { brand_name } = req.body;

		await brandDao.insertBrand({ brand_name });

		res.status(200).json();
	} catch(err) {
		next(err);
	}
};

module.exports = { createBrand, getBrandList };