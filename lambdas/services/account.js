const JWT_SECRET = require('../../config/secret').SECRET_KEY;
const jwt = require('jsonwebtoken');
const { Dao, query } = require('../../dao');
const utils = require('../utils');

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

			const decodedData = jwt.verify(accessToken, JWT_SECRET);
			console.log(decodedData);
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
		const storeData = await this.getStoreDataByStoreName(credentials.store_name) || {};
		const credentialPassword = utils.cryptonite(credentials.password);

		if (storeData.password === credentialPassword) {
			return { storeId: storeData.id };
		} else {
			return { storeId: null };
		}
	}

	async getStoreById(storeId) {
		const { selectStoreData } = query.store;
		const [
			{
				id,
				store_name,
				is_admin,
				brand_id,
				brand_name
			}
		] = await this.database.query(selectStoreData(storeId));

		return {
			id,
			store_name,
			is_admin: Boolean(is_admin),
			brand: {
				id: brand_id,
				brand_name: brand_name
			}
		};
	}

	async getStoreDataByStoreName(storeName) {
		return this.storeDao.selectOne({ store_name: storeName }, ['id', 'password'])
		           .then(data => data && data.toJSON());
	}

	getAccessToken(storeId) {
		return jwt.sign({ id: storeId }, JWT_SECRET);
	}
}

module.exports = AccountService;