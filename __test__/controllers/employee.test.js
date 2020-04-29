const { load, teardown, request, login } = require('../setup');

describe('Test Employee Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create employee', async () => {
		const token = await login();
		const data = { employee_name: 'test', enrolled_in: '2020-04-29T11:04:38.000Z' };

		const response = await request.post('/employee')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});
});

describe('Test Employee Select By StoreId Controller', () => {
	afterAll(async () => {
		await teardown();
	});

	it('should send 404 when select employees without store_id', async () => {
		const token = await login();
		const response = await request.get('/employee')
		                              .set('Authorization', token)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(404);
	});

	it('should send 200 when select employees by store_id', async () => {
		const token = await login();
		const response = await request.get('/employee/1')
		                              .set('Authorization', token)
		                              .then(res => res.toJSON());
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('id', 1);
		expect(data[0]).toHaveProperty('employee_name', 'test');
		expect(data[0]).toHaveProperty('enrolled_in', '2020-04-29T11:04:38.000Z');
	});
});
