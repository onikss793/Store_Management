const utils = require('../test-utils');

const newEmployeeData = {
	employee_name: utils.makeRandomName(3),
	store_id: 1,
	phone_number: utils.makeRandomName(11)
};

describe('직원 생성', () => {
	beforeAll(async () => {
		await utils.setMasterStore();
	});
	afterAll(async () => {
		await utils.forceDatabase();
	});

	test('새로운 직원을 1번 매장에 등록한다', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newEmployeeData,
			endpoint: '/employee',
			accessToken
		});

		expect(response.status).toBe(200);
	});

	test('해당 직원 확인', async () => {
		const [employeeData] = await utils.database.query(`
			SELECT
				id,
				employee_name,
				phone_number
			FROM employees
			WHERE employee_name = "${newEmployeeData.employee_name}"
		`);


		expect(employeeData).toEqual({
			id: 1,
			employee_name: newEmployeeData.employee_name,
			phone_number: newEmployeeData.phone_number,
		});
	});
});