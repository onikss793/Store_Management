const utils = require('../test-utils');
const moment = require('moment');
const timeout = 60000;

const newEmployeeData = {
	employee_name: utils.makeRandomName(3),
	store_id: 1,
	phone_number: utils.makeRandomName(11)
};

describe('직원 생성 > 목록 확인', () => {
	test('새로운 직원을 1번 매장에 등록하고 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newEmployeeData,
			endpoint: '/employee',
			accessToken
		});
		const [employeeData] = await utils.database.query(`
			SELECT
				id,
				employee_name,
				phone_number
			FROM employees
			WHERE employee_name = "${newEmployeeData.employee_name}"
		`);

		expect(employeeData).toEqual({
			id: expect.any(Number),
			employee_name: newEmployeeData.employee_name,
			phone_number: newEmployeeData.phone_number,
		});
		expect(response.status).toBe(200);
	}, timeout);

	test('직원 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/employee?storeId=1&date=' + moment().toISOString(),
			accessToken
		});

		expect(response.data.data).toEqual(expect.arrayContaining([
			{
				id: expect.any(Number),
				employee_name: newEmployeeData.employee_name,
				vacation: false
			}
		]));
	}, timeout);
});
