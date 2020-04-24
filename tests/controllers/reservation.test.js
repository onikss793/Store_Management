const { load, teardown, request, login } = require('../setup');

describe('Test Reservation Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create reservation', async () => {
		const token = await login();
		const data = {
			employee_id: 25,
			client_id: 23,
			service_id: 1,
			start_at: new Date(2020, 5, 1, 14, 30),
			finish_at: new Date(2020, 5, 1, 15),
			store_id: 1,
			memo: 'This is important reservation!'
		};

		const response = await request.post('/reservation')
			.set('Authorization', token)
			.send(data)
			.then(res => res.toJSON());

		console.log(response);
		expect(response.status).toEqual(200);
	});
})