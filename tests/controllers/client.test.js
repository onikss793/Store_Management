const { load, teardown, request, login } = require('../setup');

describe('Test Client Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create client', async () => {
		const token = await login();
		const data = {
			client_name: 'Minsoo Kim',
			phone_number: '01012345678',
			info: 'Nice Customer'
		};

		const response = await request.post('/client')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});