const { load, teardown, postApi, getApi } = require('../setup');

describe('Test Brand Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create brand', async () => {
		const data = { brand_name: 'test' };
		const response = await postApi('/brand', data);

		expect(response.status).toEqual(200);
	});
});

describe('Test Brand Select All Controller', () => {
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when select all brands', async () => {
		const response = await getApi('/brand');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('brand_name', 'test');
	});
})