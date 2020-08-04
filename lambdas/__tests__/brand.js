const utils = require('../test-utils');

const newBrandData = {
	brand_name: utils.makeRandomName(3)
};

describe('브랜드 생성 > 확인 > 목록', () => {
	beforeAll(async () => {
		await utils.setMasterStore();
	});
	afterAll(async () => {
		await utils.forceDatabase();
	});

	test('새로운 브랜드를 만든다', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newBrandData,
			endpoint: '/brand',
			accessToken
		});

		expect(response.status).toBe(200);
	});

	test('해당 브랜드를 확인', async () => {
		const [brandData] = await utils.database.query(`
			SELECT
				id,
				brand_name
			FROM brands
			WHERE brand_name = "${newBrandData.brand_name}"
		`);

		expect(brandData).toEqual({
			id: expect.any(Number),
			brand_name: newBrandData.brand_name
		});
	});

	test('브랜드 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/brand',
			accessToken
		});

		expect(response.status).toBe(200);
		expect(response.data.data.length).toBe(1);
		expect(response.data.data[0]).toEqual({
			id: 1,
			brand_name: newBrandData.brand_name
		});
	});
});