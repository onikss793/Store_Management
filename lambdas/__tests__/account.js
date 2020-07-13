const utils = require('../test-utils');

const newStoreData = {
	'store_name': utils.makeStoreName(4),
	'password': 'password',
	'brand_id': 1,
	'is_admin': true
};

describe('로그인 테스트', () => {
	beforeAll(async () => {
		await utils.forceDatabase();
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
			console.log(err);
			expect(err.response.status).toBe(401);
		}
	});
});
