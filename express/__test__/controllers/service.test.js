const Test = new (require('../Test'))();
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
	await Test.loadService();
	await Test.login();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test Service Create Controller', () => {
	it('should send 200 when create service', async () => {
		const data = {
			service_name: '쿨 네일',
			color: 'rgba(255, 255, 255, 0.5)',
			store_id: 1
		};
		const response = await Test.post('/service', data);

		expect(response.status).toEqual(200);
	}, timeout);

	it('should send 400 when Bad Request', async () => {
		const data = {
			service_name: '',
			color: '',
			store_id: null
		};
		const response = await Test.post('/service', data);

		expect(response.status).toEqual(400);
	}, timeout);
});

describe('Test Service List Controller', () => {
	it('should send 200 when select service list', async () => {
		const response = await Test.get('/service/1');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('service_name', '젤 네일');
		expect(data[0]).toHaveProperty('color', 'rgba(0,0,0,1)');
	}, timeout);
});
