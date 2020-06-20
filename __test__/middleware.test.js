const Test = new (require('./Test'))();
const storeList = require('./stores.json');
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test authMiddleware', () => {
	it('should have superuser: true, is_admin: true when id 1, 2', async () => {
		const { store_name: name, password } = storeList[0];
		const login = await Test.post('/account', { name, password });
		const token = JSON.parse(login.text).token;
		const response = await Test.bearCall('/authTest', 'GET', token);
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', true);
		expect(data).toHaveProperty('is_admin', true);
		expect(data).toHaveProperty('store_id', 1);
	}, timeout);

	it('should have superuser: false, is_admin: true when is_admin is true', async () => {
		const { store_name: name, password } = storeList[3];
		const login = await Test.post('/account', { name, password });

		const token = JSON.parse(login.text).token;
		const response = await Test.bearCall('/authTest', 'GET', token);
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', false);
		expect(data).toHaveProperty('is_admin', true);
		expect(data).toHaveProperty('store_id', 4);
	}, timeout);

	it('should have superuser: false, is_admin: false when everything false', async () => {
		const { store_name: name, password } = storeList[5];
		const login = await Test.post('/account', { name, password });
		const token = JSON.parse(login.text).token;
		const response = await Test.bearCall('/authTest', 'GET', token);
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', false);
		expect(data).toHaveProperty('is_admin', false);
		expect(data).toHaveProperty('store_id', 6);
	}, timeout);
});
