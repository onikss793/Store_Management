const brandDao = require('../../dao').brand,
	utils = require('../../utils');

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

module.exports = { createBrand };