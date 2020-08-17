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

describe('Test Client Create Controller', () => {
	it('should send 200 when create client', async () => {
		const data = {
			client_name: 'Minsoo Kim',
			phone_number: '01012345678',
			info: 'Nice Customer',
			store_id: 1
		};
		const response = await Test.post('/client', data);

		expect(response.status).toEqual(200);
	}, timeout);
});

describe('Test Client Get Controller', () => {
	it('should send 200 when select client by store_id', async () => {
		const response = await Test.get('/client/1');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('id', 1);
		expect(data[0]).toHaveProperty('client_name', 'Minsoo Kim');
		expect(data[0]).toHaveProperty('phone_number', '01012345678');
		expect(data[0]).toHaveProperty('info', 'Nice Customer');
	}, timeout);
});

describe('Test Client Update Controller', () => {
	it('should send 200 when update client', async () => {
		const client = {
			client_name: 'updated',
			phone_number: '01012345678',
			info: 'Nice Customer',
			store_id: 1
		};
		const response = await Test.post('/client/1', client);
		const updated = await Test.get('/client/1').then((res) => JSON.parse(res.text));

		expect(response.status).toEqual(200);
		expect(updated[0]).toHaveProperty('client_name', 'updated');
	}, timeout);
});
