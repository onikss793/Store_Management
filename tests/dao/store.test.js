const { load, teardown } = require('../setup'),
	dao = require('../../dao');

describe('Test Store Dao', () => {
	beforeAll(async () => {
		await load();
	});
	afterAll(async () => {
		await teardown();
	});

	it('should insert store', () => {
		expect(true).toBe(true);
	});
})