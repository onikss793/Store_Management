const dao = require('../../dao'),
	bcrypt = require('bcrypt'),
	utils = require('../../utils');

const createStore = async (req, res, next) => {
	try {
		const properties = [
			'store_name',
			'password',
			'brand_id'
		];
		!utils.checkRequest(req, properties) && next(utils.throwError(400, 'Bad Request'));

		const salt = Number(process.env.SALT_ROUNDS);
		const data = req.body;
		data.password = await bcrypt.hash(data.password, salt);

		await dao.store.insertStore(data);

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

const storeList = async (req, res, next) => {
	try {
		const stores = await dao.store.selectStoreList('brand_id');

		const data = await Promise.all(stores.map(async d => {
			const store = d.toJSON();

			store.brand_name = dao.brand.selectBrand({ id: store.brand_id })
			   .then(d => d && d.toJSON()).brand_name;

			return store;
		}));

		res.status(200).json(data);
	} catch (err) {
		console.log('ERROR: ', err)
		next(err);
	}
}

module.exports = { createStore, storeList };