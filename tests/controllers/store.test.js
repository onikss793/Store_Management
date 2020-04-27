const { load, teardown, request, getStoreData, loadStoreList, login, loadBrandList } = require('../setup');

describe('Test Store Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create store', async () => {
		const data = await getStoreData();
		const token = await login();

		const result = await request.post('/store')
		                            .send(data)
		                            .set('Authorization', token)
		                            .then(res => res.toJSON());

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

		const token = await login();
		const brand_result = await request.post('/store').set('Authorization', token)
		                                  .send(brand_null)
		                                  .then(res => res.toJSON()),
			store_result = await request.post('/store').set('Authorization', token)
			                            .send(store_name_null)
			                            .then(res => res.toJSON()),
			password_result = await request.post('/store').set('Authorization', token)
			                               .send(password_null)
			                               .then(res => res.toJSON());

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
		const token = await login();
		const result = await request.get('/store').set('Authorization', token).then(res => res.toJSON());

		expect(result.status).toEqual(200);
	});
});