const { load, teardown, request, login } = require('../setup');

describe('Test Service Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create service', async () => {
		const token = await login();
		const data = {
			service_name: '젤 네일',
			color: 'rgb(255, 255, 255)',
			store_id: 1
		};

		const response = await request.post('/service')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});