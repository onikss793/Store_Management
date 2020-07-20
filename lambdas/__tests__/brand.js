const utils = require('../test-utils');

const newBrandData = {
	brand_name: utils.makeRandomName(3)
};

describe('브랜드 생성', () => {
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
});