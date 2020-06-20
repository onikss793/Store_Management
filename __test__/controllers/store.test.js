const Test = new (require('../Test'))();
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
	await Test.loadBrandList();
	await Test.login();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test Store Create Controller', () => {
	test('should send 200 when create store', async () => {
		const data = {
			store_name: 'created store',
			password: 'test',
			brand_id: 1,
			is_admin: false
		};
		const result = await Test.post('/store', data);

		expect(result.status).toEqual(200);
	}, timeout);

	test('should throw 400 error', async () => {
		const brand_null = {
				store_name: '1234',
				password: '1111',
				brand_id: null
			},
			store_name_null = {
				store_name: '',
				password: '1111',
				brand_id: 1
			},
			password_null = {
				store_name: 'hello',
				password: '',
				brand_id: 1
			};

		const brand_result = await Test.post('/store', brand_null);
		const store_result = await Test.post('/store', store_name_null);
		const password_result = await Test.post('/store', password_null);

		expect(brand_result.status).toEqual(400);
		expect(store_result.status).toEqual(400);
		expect(password_result.status).toEqual(400);
	}, timeout);
});

describe('Test Store List Controller', () => {
	test('should send 200', async () => {
		const result = await Test.get('/store');

		expect(result.status).toEqual(200);
	}, timeout);
});
