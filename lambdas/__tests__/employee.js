const utils = require('../test-utils');
const moment = require('moment');
const timeout = 60000;

const makeRandomPhonNumber = (randomString) => randomString.splice(3, 0, '-').splice(8, 0, '-');

const newEmployeeData = {
	employee_name: utils.makeRandomName(3),
	store_id: 1,
	phone_number: makeRandomPhonNumber(utils.makeRandomName(11))
};

afterAll(() => {
	utils.database.close();
});

describe('직원 생성 > 목록 확인', () => {
	let duplicated = false;

	test('새로운 직원을 1번 매장에 등록', async () => {
		expect.assertions(1);
		const accessToken = await utils.getMasterAccessToken();

		const result = await utils.axiosCall({
			method: 'POST',
			data: newEmployeeData,
			endpoint: '/employee',
			accessToken
		});

		if (result.status === 200) {
			expect(result.status).toBe(200);
		} else if (result.response.status === 409) {
			expect(result.response.status).toBe(409);
		}
	}, timeout);

	test('만든 직원 확인', async () => {
		const [employeeData] = await utils.database.query(`
			SELECT
				id,
				employee_name,
				phone_number
				FROM employees
			WHERE phone_number = "${newEmployeeData.phone_number}"
		`);

		expect(employeeData).toEqual({
			id: expect.any(Number),
			employee_name: expect.any(String),
			phone_number: newEmployeeData.phone_number,
		});
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
