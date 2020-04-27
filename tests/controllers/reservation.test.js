const {
	load,
	teardown,
	request,
	login,
	loadReservationList,
	loadStoreList,
	loadEmployees,
	loadServices,
	loadClient
} = require('../setup');

describe('Test Reservation Create Controller', () => {
	beforeAll(async () => {
		await load();
		await loadStoreList();
		await loadEmployees();
		await loadServices();
		await loadClient();
		await loadReservationList();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create reservation', async () => {
		const token = await login();
		const data = {
			employee_id: 1,
			client_id: 2,
			service_id: 2,
			start_at: new Date(2020, 5, 1, 12, 30),
			finish_at: new Date(2020, 5, 1, 13),
			store_id: 1,
			memo: 'This is very important reservation!'
		};

		const response = await request.post('/reservation')
		                              .set('Authorization', token)
		                              .send(data)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});

	it('should send 200 when select reservation', async () => {
		const token = await login();

		const response = await request.post('/reservation/1?date=2020-05-31T15:00:00.000Z')
		                              .set('Authorization', token)
		                              .then(res => res.toJSON());

		expect(response.status).toEqual(200);
	});

	it('should match data form of reservation list', async () => {
		const token= await login();

		const response = await request.post('/reservation/1?date=2020-05-31T15:00:00.000Z')
			.set('Authorization', token)
			.then(res => res.toJSON());

		const data = JSON.parse(response.text)
		// console.log('reservation count: ', data.length);
		// console.log('data: ', data);
		// console.log('all: ', await require('../../dao/reservation').selectAll().map(d => d.toJSON()));
		data.forEach(res => {
			expect(res).toHaveProperty('id');
			expect(res).toHaveProperty('employee.employee_name');
			expect(res).toHaveProperty('client.client_name');
			expect(res).toHaveProperty('client.phone_number');
			expect(res).toHaveProperty('client.info');
			expect(res).toHaveProperty('service.service_name');
			expect(res).toHaveProperty('service.color');
			expect(res).toHaveProperty('client.client_name');
			expect(res).toHaveProperty('start_at');
			expect(res).toHaveProperty('finish_at');
			expect(res).toHaveProperty('status');
			expect(res).toHaveProperty('memo');
		})
	})
});
