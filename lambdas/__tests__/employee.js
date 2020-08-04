const utils = require('../test-utils');
const { inspect } = require('util');
const moment = require('moment');
const STANDARD = moment();

const newEmployeeData = {
	employee_name: utils.makeRandomName(3),
	store_id: 1,
	phone_number: utils.makeRandomName(11)
};
const newVacationData = {
	employee_id: 1,
	start_at: STANDARD.toISOString(),
	finish_at: STANDARD.add(3, 'days').toISOString()
};

describe('직원 생성 > 목록 확인', () => {
	beforeAll(async () => {
		await utils.setMasterStore();
	});
	afterAll(async () => {
		await utils.forceDatabase();
	});

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
			id: 1,
			employee_name: newEmployeeData.employee_name,
			phone_number: newEmployeeData.phone_number,
		});
		expect(response.status).toBe(200);
	});

	test('직원 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/employee?storeId=1&date=' + moment().toISOString(),
			accessToken
		});

		expect(response.data.data.length).toBe(1);
		expect(response.data.data[0]).toEqual({
			id: 1,
			employee_name: newEmployeeData.employee_name,
			vacation: false
		});
	});

	test('직원 휴가 등록 후 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/vacation',
			method: 'POST',
			accessToken,
			data: newVacationData
		});

		expect(response.status).toBe(200);

		const [vacationData] = await utils.database.query(`
			SELECT
				id,
				employee_id,
				start_at,
				finish_at
			FROM vacations
			WHERE id = 1
		`);

		expect(vacationData).toEqual({
			id: 1,
			employee_id: newVacationData.employee_id,
			start_at: expect.any(Date),
			finish_at: expect.any(Date)
		});
	});

	test('중복된 휴가 등록 시도 => 409', async () => {
		try {
			const accessToken = await utils.getMasterAccessToken();

			const response = await utils.axiosCall({
				endpoint: '/vacation',
				method: 'POST',
				accessToken,
				data: {
					employee_id: 1,
					start_at: STANDARD.add(1, 'days').toISOString(),
					finish_at: STANDARD.add(2, 'days').toISOString()
				}
			});

			expect(response).toBeFalsy();
		} catch (err) {
			expect(err.response.status).toBe(409);
		}
	});

	test('1번 매장 전체 휴가 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/vacation?storeId=1',
			accessToken
		});
		console.log(inspect(response.data, true, null, true));
		expect(response.status).toBe(200);
	});
});
