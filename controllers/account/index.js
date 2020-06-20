const utils = require('../../utils');
const helper = require('./helper');
const { Dao } = require('../../dao');
const { database } = require('../../database');

// class AccountController {
// 	constructor() {
// 		this.storeDao = new Dao(database, 'Store');
// 	}
//
// 	async login(req, res, next) {
// 		try {
// 			console.info(this);
// 			if (!utils.checkRequest(req, ['name', 'password'])) {
// 				next(utils.throwError(400, 'Bad Request'));
// 			}
//
// 			const { name, password } = req.body;
// 			const store_data = await this.storeDao.selectOne({ store_name: name })
// 			                                 .then(data => data && data.toJSON());
//
// 			if (helper.dataExist(store_data)) {
// 				if (helper.compareCrypto(password, store_data.password)) {
// 					res.status(200).json({
// 						...helper.renderStoreData(store_data),
// 						token: helper.signJwt(store_data)
// 					});
// 				} else {
// 					next(utils.throwError(401, 'Wrong Password'));
// 				}
// 			} else {
// 				next(utils.throwError(401, 'No Match For Store Name'));
// 			}
// 		} catch (err) {
// 			next(err);
// 		}
// 	}
// }

const login = async (req, res, next) => {
	try {
		const storeDao = new Dao(database, 'Store');

		if (!utils.checkRequest(req, ['name', 'password'])) {
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
