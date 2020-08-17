const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Dao, query } = require('../dao');
const utils = require('../lambdas/utils');

class AccountService {
	constructor(database) {
		this.database = database;
		this.storeDao = new Dao(database, 'Store');
	}

	async authorize(request) {
		try {
			const accessToken = request.headers.authorization;
			if (!accessToken) {
				return utils.makeError({
					statusCode: 401,
					name: 'Unauthorized',
					message: 'Access Token Missing'
				});
			}
			const decodedData = jwt.verify(accessToken, process.env.SECRET_KEY);
			const storeData = await this.getStoreById(decodedData.id);

			if (!storeData || !storeData.id) {
				return utils.makeError({
					statusCode: 401,
					name: 'Unauthorized',
					message: 'Something wrong with the Payload. Login Again'
				});
			}

			request.isAdmin = Boolean(storeData.is_admin);
			request.accountId = Number(storeData.id);
		} catch (err) {
			console.log(err);
			return utils.makeError({ statusCode: 401, ...err });
		}
	}

	async login(credentials) {
		const storeData = await this.getStoreDataByStoreName(credentials.store_name);
		if (!storeData) {
			return { storeId: null };
		}

		const result = await bcrypt.compare(credentials.password, storeData.password);

		if (result) {
			return { storeId: storeData.id };
		}
		return { storeId: null };
	}

	async getStoreById(storeId) {
		const { selectStoreData } = query.store;
		const [result] = await this.database.query(selectStoreData(storeId));

		if (result) {
			const { id, store_name, is_admin, brand_id, brand_name } = result;

			return {
				id,
				store_name,
				is_admin: Boolean(is_admin),
				brand: {
					id: brand_id,
					brand_name
				}
			};
		}

		return {};
	}

	async getStoreDataByStoreName(storeName) {
		return this.storeDao.selectOne({ store_name: storeName }, ['id', 'password'])
			.then(data => data && data.toJSON());
	}

	getAccessToken(storeId) {
		return jwt.sign({ id: storeId }, process.env.SECRET_KEY);
	}
}

module.exports = AccountService;
