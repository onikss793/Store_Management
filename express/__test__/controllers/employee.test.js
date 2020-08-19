const Test = new (require('../Test'))();
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
	await Test.loadEmployeeList();
	await Test.login();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test Employee Create Controller', () => {
	it('should send 200 when create employee', async () => {
		const data = { employee_name: 'test' };
		const response = await Test.post('/employee', data);

		expect(response.status).toEqual(200);
	}, timeout);
});

describe('Test Employee Select By StoreId Controller', () => {
	it('should send 200 when select employees without store_id', async () => {
		// store_id querystring 없이 만들 경우, token 에서 추출한 매장 아이디 사용
		const response = await Test.get('/employee');

		expect(response.status).toEqual(200);
	}, timeout);

	it('should send 200 when select employees by store_id', async () => {
		const response = await Test.get('/employee?store_id=1');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('id', 1);
		expect(data[0]).toHaveProperty('employee_name', 'Charles');
	}, timeout);
});

describe('Test Employee creating Vacation', () => {
	it('should send 200 when creating vacation', async () => {
		const data = { employee_id: 1, start_at: '2020-06-29T11:04:38.000Z', finish_at: '2020-06-30T11:04:38.000Z' };
		const response = await Test.post('/employee/vacation', data);

		expect(response.status).toEqual(200);
	}, timeout);

	it('should send 400 when empty body', async () => {
		const data = { employee_id: null, start_at: null, finish_at: null };
		const response = await Test.post('/employee/vacation', data);

		expect(response.status).toEqual(400);
	}, timeout);
});
