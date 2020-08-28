const utils = require('../test-utils');

const newBrandData = {
	brand_name: utils.makeRandomName(3)
};

afterAll(async () => {
	await utils.database.close();
});

describe('브랜드 생성 > 확인 > 목록', () => {
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
		expect(response.data.data).toEqual(expect.arrayContaining([
			{ id: expect.any(Number), brand_name: newBrandData.brand_name }
		]));
	});

	test('브랜드 삭제 후 확인', async () => {
		expect.assertions(3);
		const accessToken = await utils.getMasterAccessToken();
		const [brandData] = await utils.database.query(`
			SELECT
				id,
				brand_name
			FROM brands
			WHERE brand_name = "${newBrandData.brand_name}"
		`);

		const brandId = brandData.id;

		const response = await utils.axiosCall({
			endpoint: '/brand/' + brandId,
			method: 'DELETE',
			accessToken
		});

		expect(response.data.success).toBe(true);

		const [deletedBrand] = await utils.database.query(`
			SELECT id, brand_name, deleted_at FROM brands WHERE id = ${brandId}
		`);

		expect(deletedBrand.deleted_at).toEqual(expect.any(Date));
		expect(deletedBrand.brand_name).toEqual(expect.any(String));
	});
});
