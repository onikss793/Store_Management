const { load, teardown, request, login } = require('../setup');

describe('Test Brand Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create brand', async () => {
		const token = await login();
		const data = { brand_name: 'test' };

		const response = await request.post('/brand')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});