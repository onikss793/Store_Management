const utils = require('../test-utils');

const newBrandData = {
	brand_name: utils.makeRandomName(3)
};

describe('브랜드 생성', () => {
	beforeAll(async () => {
		// await utils.forceDatabase();
		await utils.setMasterStore();
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
});