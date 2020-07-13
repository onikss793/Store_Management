const utils = require('../test-utils');

const newStoreData = {
	store_name: utils.makeRandomName(4),
	password: 'password',
	brand_id: 1,
	is_admin: true
};

describe('매장 생성 > 로그인(+, -)', () => {
	beforeAll(async () => {
		// await utils.forceDatabase();
		await utils.setMasterStore();
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

	test('매장 정보 업데이트', async () => {
		const accessToken = await utils.getMasterAccessToken();
		const storeData = {
			store_name: 'changed',
			password: 'p@ssword',
			brand_id: 1,
			is_admin: false
		};

		const response = await utils.axiosCall({
			method: 'POST',
			data: storeData,
			endpoint: '/store',
			accessToken
		});

		expect(response.status).toBe(200);
	});
});
