const Test = new (require('../Test'))();
const storeList = require('../stores.json');
const timeout = 60000;

beforeAll(async () => {
	await Test.loadDB();
	await Test.loadStoreList();
}, timeout);
afterAll(async () => {
	await Test.tearDown();
}, timeout);

describe('Test Login Controller', () => {
	it('should send 200 OK', async () => {
		const { store_name: name, password } = Array.from(storeList)[0];
		const response = await Test.post('/account', {
			name,
			password
		});
		const token = JSON.parse(response.text).token;

		expect(response.status).toEqual(200);
		expect(token).toEqual(expect.any(String));
	}, timeout);

	it('should send 400', async () => {
		const response = await Test.post('/account', {
			name: null,
			password: null
		});

		expect(response.status).toEqual(400);
	}, timeout);

	it('should send 401 Auth Failed', async () => {
		const response = await Test.post('/account', {
			name: '선릉 1호점',
			password: '1234'
		});

		expect(response.status).toEqual(401);
	}, timeout);

	it('should send 401 No Match', async () => {
		const response = await Test.post('/account', {
			name: '선릉 2호점',
			password: '1111'
		});

		expect(response.status).toEqual(401);
	}, timeout);
});
