const { load, teardown, getStoreData, loadStoreList, loadBrandList, getApi, postApi } = require('../setup');

describe('Test Store Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create store', async () => {
		const data = await getStoreData();
		const result = await postApi('/store', data);

		expect(result.status).toEqual(200);
	});

	it('should throw 400 error', async () => {
		const brand_null = {
				store_name: '1234',
				password: '1111',
				brand_id: null
			},
			store_name_null = {
				store_name: '',
				password: '1111',
				brand_id: 1
			},
			password_null = {
				store_name: 'hello',
				password: '',
				brand_id: 1
			};
		const brand_result = await postApi('/store', brand_null);
		const store_result = await postApi('/store', store_name_null);
		const password_result = await postApi('/store', password_null);

		expect(brand_result.status).toEqual(400);
		expect(store_result.status).toEqual(400);
		expect(password_result.status).toEqual(400);
	});
});

describe('Test Store List Controller', () => {
	beforeAll(async () => {
		await load();
		await loadBrandList();
		await loadStoreList();
	});

	afterAll(async () => {
		await teardown();
	});

	it('should send 200', async () => {
		const result = await getApi('/store');

		expect(result.status).toEqual(200);
	});
});