const { Dao, query } = require('../dao');
const utils = require('../lambdas/utils');

class StoreService {
	constructor(database) {
		this.database = database;
		this.storeDao = new Dao(database, 'Store');
	}

	async createStore(storeData, transaction) {
		storeData.password = utils.cryptonite(storeData.password);

		return this.storeDao.insertOne(storeData, transaction);
	}

	async getAllStores() {
		const { selectStoreList } = query.store;
		const storeData = await this.database.query(selectStoreList());

		return storeData.map(({ id, store_name, is_admin, brand_id, brand_name }) => {
			return {
				id,
				store_name,
				is_admin: Boolean(is_admin),
				brand: {
					id: brand_id,
					brand_name
				}
			};
		});
	}

	async getStoreById(storeId) {
		const { selectStoreData } = query.store;
		const [storeData] = await this.database.query(selectStoreData(storeId));

		if (!storeData) {
			return {};
		}

		const {
			id,
			store_name,
			is_admin,
			brand_id,
			brand_name
		} = storeData;

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

	async deleteStore(storeId, transaction) {
		const index = { id: storeId };
		const attributes = ['store_name'];

		return this.storeDao.deleteOne(index, attributes, transaction);
	}
}

module.exports = StoreService;
