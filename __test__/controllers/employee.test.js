const { load, teardown, postApi, getApi } = require('../setup');

describe('Test Employee Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create employee', async () => {
		const data = { employee_name: 'test', enrolled_in: '2020-04-29T11:04:38.000Z' };
		const response = await postApi('/employee', data);

		expect(response.status).toEqual(200);
	});
});

describe('Test Employee Select By StoreId Controller', () => {
	it('should send 404 when select employees without store_id', async () => {
		const response = await getApi('/employee');

		expect(response.status).toEqual(404);
	});

	it('should send 200 when select employees by store_id', async () => {
		const response = await getApi('/employee/1');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('id', 1);
		expect(data[0]).toHaveProperty('employee_name', 'test');
		expect(data[0]).toHaveProperty('enrolled_in', '2020-04-29T11:04:38.000Z');
	});
});

describe('Test Employee creating Vacation', () => {
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when creating vacation', async () => {
		const data = { employee_id: 1, start_at: '2020-06-29T11:04:38.000Z', finish_at: '2020-06-30T11:04:38.000Z' };
		const response = await postApi('/employee/vacation', data);

		expect(response.status).toEqual(200);
	});

	it('should send 400 when empty body', async () => {
		const data = { employee_id: null, start_at: null, finish_at: null };
		const response = await postApi('/employee/vacation', data);

		expect(response.status).toEqual(400);
	});
});
