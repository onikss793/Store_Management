const utils = require('../../utils');
const helper = require('./helper');
const { Dao } = require('../../dao');
const { database } = require('../../database');
const storeDao = new Dao(database, 'Store');

const login = async (req, res, next) => {
	try {
		const properties = ['name', 'password'];

		if (!utils.checkRequest(req, properties)) {
			next(utils.throwError(400, 'Bad Request'));
		}

		const { name, password } = req.body;
		const store_data = await storeDao.selectOne({ store_name: name })
		                                 .then(data => data && data.toJSON());

		if (helper.dataExist(store_data)) {
			if (helper.compareCrypto(password, store_data.password)) {
				res.status(200).json({
					...helper.renderStoreData(store_data),
					token: helper.signJwt(store_data)
				});
			} else {
				next(utils.throwError(401, 'Wrong Password'));
			}
		} else {
			next(utils.throwError(401, 'No Match For Store Name'));
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { login };
