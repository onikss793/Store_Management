const utils = require('../test-utils');

const newStoreData = {
	store_name: utils.makeRandomName(4),
	password: 'password',
	brand_id: 1,
	is_admin: true
};

describe('매장 생성 > 로그인(+, -)', () => {
	beforeAll(async () => {
		await utils.setMasterStore();
	});
	afterAll(async () => {
		await utils.forceDatabase();
	});

	test('새로운 매장을 만든다', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newStoreData,
			endpoint: '/store',
			accessToken
		});

		expect(response.status).toBe(200);
	});

	test('해당 매장 정보 확인', async () => {
		const [storeData] = await utils.database.query(`
			SELECT
				id,
				store_name,
				brand_id,
				is_admin
			FROM stores
			WHERE store_name = "${newStoreData.store_name}"
		`);
		storeData.is_admin = Boolean(storeData.is_admin);

		expect(storeData).toEqual({
			id: 2,
			store_name: newStoreData.store_name,
			brand_id: newStoreData.brand_id,
			is_admin: newStoreData.is_admin,
		});
	});

	test('그 매장으로 로그인을 시도한다', async () => {
		const credential = {
			'store_name': newStoreData.store_name,
			'password': newStoreData.password
		};

		const response = await utils.axiosCall({
			method: 'POST',
			data: credential,
			endpoint: '/account'
		});

		expect(response.status).toBe(200);
	});

	test('잘못된 비밀번호로 로그인을 시도한다 => 401', async () => {
		try {
			const credential = {
				'store_name': newStoreData.store_name,
				'password': 'wrong'
			};

			await utils.axiosCall({
				method: 'POST',
				data: credential,
				endpoint: '/account'
			});
		} catch (err) {
			expect(err.response.status).toBe(401);
		}
	});
});
