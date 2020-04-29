const { load, teardown, postApi, getApi } = require('../setup');

describe('Test Brand Create Controller', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when create brand', async () => {
		const data = { brand_name: 'test' };
		const response = await postApi('/brand', data);

		expect(response.status).toEqual(200);
	});
});