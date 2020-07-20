const Test = new (require('../Test'))();
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
	await Test.loadService();
	await Test.loadClient();
	await Test.loadEmployeeList();
	await Test.loadReservation();
	await Test.login();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test Reservation Create Controller', () => {
	it('should send 200 when create reservation', async () => {
		const data = {
			employee_id: 1,
			client_id: 2,
			service_id: 2,
			start_at: new Date(2020, 5, 1, 12, 30),
			finish_at: new Date(2020, 5, 1, 13),
			store_id: 1,
			memo: 'This is very important reservation!'
		};
		const response = await Test.post('/reservation', data);

		expect(response.status).toEqual(200);
	}, timeout);

	it('should send 200 when select reservation', async () => {
		const response = await Test.get('/reservation/1?date=2020-05-31T15:00:00.000Z');

		expect(response.status).toEqual(200);
	}, timeout);

	it('should match data form of reservation list', async () => {
		const response = await Test.get('/reservation/1?date=2020-05-31T15:00:00.000Z');

		const data = JSON.parse(response.text);

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
		});
	}, timeout);
});

describe('should update reservation', () => {
	it('should send 200 when update reservation', async () => {
		const data = {
			employee_id: 3,
			client_id: 3,
			service_id: 3,
			start_at: new Date(2021, 5, 1, 12, 30),
			finish_at: new Date(2021, 5, 1, 13),
			status: 'canceled',
			memo: 'updated!!'
		};
		const response = await Test.post('/reservation/1', data);
		const reservation = await Test.reservationDao.selectOne({ id: 1 });

		expect(response.status).toEqual(200);
		expect(reservation).toHaveProperty('employee_id', data.employee_id);
		expect(reservation).toHaveProperty('client_id', data.client_id);
		expect(reservation).toHaveProperty('service_id', data.service_id);
		expect(reservation).toHaveProperty('start_at', data.start_at);
		expect(reservation).toHaveProperty('finish_at', data.finish_at);
		expect(reservation).toHaveProperty('status', data.status);
		expect(reservation).toHaveProperty('memo', data.memo);
	}, timeout);
});
