const { load, teardown, loadStoreList, getApi, request } = require('./setup');

describe('Test authMiddleware', () => {
	beforeEach(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should have superuser: true, is_admin: true when id 1, 2', async () => {
		const response = await getApi('/authTest');
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', true);
		expect(data).toHaveProperty('is_admin', true);
		expect(data).toHaveProperty('store_id', 1);
	});

	it('should have superuser: false, is_admin: true when is_admin is true', async () => {
		const { store_name: name, password } = require('./stores.json')[3];
		const login = await request.post('/account')
		                           .send({ name, password })
		                           .then(res => res.toJSON());
		const token = JSON.parse(login.text).token;
		const response = await request.get('/authTest').set('Authorization', token).then(res => res.toJSON());
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', false);
		expect(data).toHaveProperty('is_admin', true);
		expect(data).toHaveProperty('store_id', 4);
	});

	it('should have superuser: false, is_admin: false when everything false', async () => {
		const { store_name: name, password } = require('./stores.json')[5];
		const login = await request.post('/account')
		                           .send({ name, password })
		                           .then(res => res.toJSON());
		const token = JSON.parse(login.text).token;
		const response = await request.get('/authTest').set('Authorization', token).then(res => res.toJSON());
		const data = JSON.parse(response.text);

		expect(data).toHaveProperty('superuser', false);
		expect(data).toHaveProperty('is_admin', false);
		expect(data).toHaveProperty('store_id', 6);
	});
});