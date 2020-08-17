const utils = require('../test-utils');

const newStoreData = {
	store_name: utils.makeRandomName(4),
	password: 'password',
	brand_id: 1,
	is_admin: false
};

afterAll(async () => {
	await utils.database.close();
});

describe('매장 생성 > 로그인(+, -) > 매장 목록', () => {
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
			id: expect.any(Number),
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

	test('Admin 계정으로 brand_id 1에 해당하는 매장 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/store',
			accessToken
		});

		expect(response.status).toBe(200);
		response.data.data.forEach(data => {
			expect(data.id).toEqual(expect.any(Number));
			expect(data.store_name).toEqual(expect.any(String));
			expect(data.is_admin).toEqual(expect.any(Boolean));
			expect(data.brand).toEqual(expect.any(Object));
		});
		expect(response.data.data).toEqual(expect.arrayContaining([
			{
				id: expect.any(Number),
				brand: utils.getSampleData().brand,
				is_admin: newStoreData.is_admin,
				store_name: newStoreData.store_name
			}
		]));
	});

	test('Admin 아닌 계정으로 매장 목록 확인 시도 => 403', async () => {
		try {
			const accessToken = await utils.axiosCall({
				endpoint: '/account',
				method: 'POST',
				data: {
					'store_name': newStoreData.store_name,
					'password': newStoreData.password
				}
			}).then(res => res.data.data.accessToken);

			await utils.axiosCall({
				endpoint: '/store',
				accessToken
			});
		} catch (err) {
			expect(err.response.status).toBe(403);
		}
	});

	test('Admin(1번) 계정으로 2번 매장 확인 시도', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'GET',
			endpoint: '/store/2',
			accessToken
		});

		expect(response.status).toBe(200);
		expect(response.data.data).toEqual({
			id: 2,
			store_name: expect.any(String),
			brand: expect.any(Object),
			is_admin: expect.any(Boolean)
		});
	});

	test('일반 계정(2번)으로 1번 매장 확인 시도 => 403', async () => {
		try {
			const accessToken = await utils.axiosCall({
				endpoint: '/account',
				method: 'POST',
				data: {
					'store_name': newStoreData.store_name,
					'password': newStoreData.password
				}
			}).then(res => res.data.data.accessToken);

			await utils.axiosCall({
				endpoint: '/store/1',
				accessToken
			});
		} catch (err) {
			expect(err.response.status).toBe(403);
		}
	});
});
