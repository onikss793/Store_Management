const { load, teardown, getApi, postApi } = require('../setup');

describe('Test Service Create Controller', () => {
	beforeAll(async () => {
		await load();
	});

	it('should send 200 when create service', async () => {
		const data = {
			service_name: '젤 네일',
			color: 'rgb(255, 255, 255)',
			store_id: 1
		};
		const response = await postApi('/service', data);

		expect(response.status).toEqual(200);
	});
});

describe('Test Service List Controller', () => {
	afterAll(async () => {
		await teardown();
	});

	it('should send 200 when select service list', async () => {
		const response = await getApi('/service/1');
		const data = JSON.parse(response.text);

		expect(response.status).toEqual(200);
		expect(data[0]).toHaveProperty('service_name', '젤 네일');
		expect(data[0]).toHaveProperty('color', 'rgb(255, 255, 255)');
	});
})