const utils = require('../test-utils');
const moment = require('moment');
const STANDARD = moment();
const timeout = 60000;

const randomAmount = () => Math.floor(Math.random() * 10) - 9;
const setDate = date => {
	return moment(date)
		.add(randomAmount(), 'days')
		.set('hour', 0)
		.set('minute', 0)
		.set('second', 0)
		.set('millisecond', 0);
};
const getDate = () => {
	const date = setDate(STANDARD);

	return (original = false) => original ? date : moment(date);
};

const randomDate = getDate();

const newEmployeeData = {
	employee_name: utils.makeRandomName(3),
	store_id: 1,
	phone_number: utils.makeRandomName(11)
};
const newVacationData = {
	employee_id: 1,
	start_at: randomDate().toISOString(),
	finish_at: randomDate().add(3, 'days').toISOString()
};

afterAll(async () => {
	await utils.database.close();
});

describe('직원 1명 생성 > 휴가 등록 > 중복된 휴가 등록 > 전체 휴가 목록 확인', () => {
	test('직원 1명 생성', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newEmployeeData,
			endpoint: '/employee',
			accessToken
		});

		expect(response.data.success).toBe(true);
	}, timeout);

	test('직원 휴가 등록 후 확인', async () => {
		expect.assertions(2);
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/vacation',
			method: 'POST',
			accessToken,
			data: newVacationData
		});

		if (response.status === 200) {
			expect(response.status).toBe(200);
		} else {
			expect(response.response.status).toBe(409);
		}

		const [vacationData] = await utils.database.query(`
				SELECT
					id,
					employee_id,
					start_at,
					finish_at
				FROM vacations
				WHERE deleted_at IS NULL
				ORDER BY id DESC
				LIMIT 1
			`);

		expect(vacationData).toEqual({
			id: expect.any(Number),
			employee_id: 1,
			start_at: expect.any(Date),
			finish_at: expect.any(Date)
		});
	}, timeout);

	test('중복된 휴가 등록 시도 => 409', async () => {
		// 현재 위의 테스트에서 중복된 휴가가 등록이 되면, 이 테스트에도 영향이 미친다. 분리해도 좋을 듯...
		expect.assertions(1);
		const accessToken = await utils.getMasterAccessToken();

		const err = await utils.axiosCall({
			endpoint: '/vacation',
			method: 'POST',
			accessToken,
			data: {
				employee_id: 1,
				start_at: randomDate(true).add(1, 'days').toISOString(),
				finish_at: randomDate(true).add(2, 'days').toISOString()
			}
		});

		expect(err.response.status).toBe(409);
	});

	test('1번 매장 전체 휴가 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/vacation?storeId=1',
			accessToken
		});

		const vacationData = await utils.database.query(`
				SELECT
					id,
					start_at,
					finish_at
				FROM vacations
				WHERE deleted_at IS NULL
			`);

		const dataMap = JSON.stringify([...vacationData].map(d => {
			d.employee = utils.getSampleData().employee;
			return d;
		}));

		expect(response.status).toBe(200);
		expect(response.data.data).toEqual(expect.arrayContaining(JSON.parse(dataMap)));
	});

	test('휴가 삭제 > 확인', async () => {
		const [vacationData] = await utils.database.query(`
			SELECT
				id
			FROM vacations
			WHERE deleted_at IS NULL
			ORDER BY id DESC
			LIMIT 1
		`);
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			endpoint: '/vacation/' + vacationData.id,
			method: 'DELETE',
			accessToken
		});

		expect(response.status).toBe(200);

		const [deletedVacationData] = await utils.database.query(`
			SELECT deleted_at FROM vacations WHERE id = ${vacationData.id}
		`);

		expect(deletedVacationData.deleted_at).not.toBe(null);
	});
});
