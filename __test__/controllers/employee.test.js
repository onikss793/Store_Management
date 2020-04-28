const { load, teardown, request, login } = require('../setup');

describe('Test Employee Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create employee', async () => {
		const token = await login();
		const data = { employee_name: 'test', enrolled_in: Date.now() };

		const response = await request.post('/employee')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});