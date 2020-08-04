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

describe('Test Brand Create Controller', () => {
	test('should send 200 when create brand', async () => {
		const data = { brand_name: 'test' };
		const response = await Test.post('/brand', data);

		expect(response.status).toEqual(200);
	}, timeout);
});

describe('Test Brand Select All Controller', () => {
	test('should send 200 when select all brands', async () => {
		const response = await Test.get('/brand');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data.length).toBe(4);
	}, timeout);
});
