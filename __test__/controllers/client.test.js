const { load, teardown, request, login } = require('../setup');

describe('Test Client Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create client', async () => {
		const token = await login();
		const data = {
			client_name: 'Minsoo Kim',
			phone_number: '01012345678',
			info: 'Nice Customer',
			store_id: 1
		};

		const response = await request.post('/client')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});

describe('Test Client Get Controller', () => {
	afterAll(async () => {
		await teardown();
	});

	it('should sned 200 when select client by store_id', async () => {
		const token = await login();
		const response = await request.get('/client/1')
		                              .set('Authorization', token)
		                              .then(res => res.toJSON());
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('id', 1);
		expect(data[0]).toHaveProperty('client_name', 'Minsoo Kim');
		expect(data[0]).toHaveProperty('phone_number', '01012345678');
		expect(data[0]).toHaveProperty('info', 'Nice Customer');
	});
});