const { load, teardown, request, getStoreData } = require('../setup'),
	dao = require('../../dao');

describe('Test Login Controller', () => {
	beforeAll(async () => {
		await load();

		const store_data = await getStoreData();

		await dao.store.insertStore(store_data);
	});
	afterAll(async () => {
		await teardown()
	})

	it('should send 400', async () => {
		const response = await request.post('/account').send({
			name: null,
			password: null
		}).then(res => res.toJSON());

		expect(response.status).toEqual(400);
	});

	it('should send 200 OK', async () => {
		const response = await request.post('/account')
		                              .send({
			                              name: '선릉 1호점',
			                              password: '1111'
		                              }).then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});

	it('should send 401 Auth Failed', async () => {
		const response = await request.post('/account')
		                              .send({
			                              name: '선릉 1호점',
			                              password: '1234'
		                              }).then(res => res.toJSON());

		expect(response.status).toEqual(401);
	});

	it('should send 401 No Match', async () => {
		const response = await request.post('/account').send({
			name: '선릉 2호점',
			password: '1111'
		}).then(res => res.toJSON());

		expect(response.status).toEqual(401);
	});
});
