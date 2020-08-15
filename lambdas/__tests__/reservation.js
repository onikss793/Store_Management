const utils = require('../test-utils');
const moment = require('moment');
const STANDARD = moment();

const randomAmount = () => Math.floor(Math.random() * 10) - 9;
const getRandomDate = () => {
	return STANDARD.add(randomAmount(), 'hours')
	               .add(randomAmount(), 'minutes')
	               .add(randomAmount(), 'days');
};
const randomDate = getRandomDate();
let randomReservationData = {
	employee_id: 1,
	store_id: 1,
	start_at: randomDate.toISOString(),
	finish_at: randomDate.add(1, 'hours').toISOString(),
	status: 'ready',
	memo: 'VIP'
};

describe('예약 등록 > 확인 > 변경 > 목록', () => {
	let duplicated = false;

	test('새로운 예약을 만든다', async () => {
		expect.assertions(1);
		const { store_id } = randomReservationData;
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: randomReservationData,
			endpoint: `/reservation?storeId=${store_id}&date=${randomDate.toISOString()}`,
			accessToken
		});
		if (response.status === 200) expect(response.status).toBe(200);
		if (response.status === 409) {
			duplicated = true;
			expect(response.status).toBe(409);
		}
	});

	test('해당 예약 확인', async () => {
		const [reservationData] = await utils.database.query(`
				SELECT
					id,
					employee_id,
					store_id,
					start_at,
					finish_at,
					status,
					memo
				FROM reservations
				ORDER BY id DESC 
				LIMIT 1
			`);

		if (duplicated) {
			expect(reservationData).toEqual({
				id: expect.any(Number),
				employee_id: 1,
				store_id: 1,
				start_at: expect.any(Date),
				finish_at: expect.any(Date),
				status: 'Changed',
				memo: randomReservationData.memo,
			});
		} else {
			expect(reservationData).toEqual({
				id: expect.any(Number),
				employee_id: 1,
				store_id: 1,
				start_at: expect.any(Date),
				finish_at: expect.any(Date),
				status: randomReservationData.status,
				memo: randomReservationData.memo,
			});
		}
	});

	test('예약 변경', async () => {
		const accessToken = await utils.getMasterAccessToken();
		const [reservationData] = await utils.database.query(`
			SELECT
				id,
				employee_id,
				store_id,
				start_at,
				finish_at,
				status,
				memo
			FROM reservations
			ORDER BY id DESC 
			LIMIT 1
		`);

		const reservationId = reservationData.id;
		const updatingData = {
			...reservationData,
			memo: 'Changed'
		};
		randomReservationData = updatingData;

		const response = await utils.axiosCall({
			method: 'PUT',
			data: updatingData,
			endpoint: `/reservation/${reservationId}`,
			accessToken
		});

		const [result] = await utils.database.query(`
			SELECT
				id,
				employee_id,
				store_id,
				start_at,
				finish_at,
				status,
				memo
			FROM reservations
			ORDER BY id DESC
			LIMIT 1
		`);
		const { id, employee_id, store_id, start_at, finish_at, status, memo } = updatingData;

		expect(response.status).toBe(200);
		expect(result).toEqual({
			id,
			employee_id,
			store_id,
			start_at,
			finish_at,
			status,
			memo,
		});
	});

	test('예약 목록 확인', async () => {
		const accessToken = await utils.getMasterAccessToken();
		const response = await utils.axiosCall({
			endpoint: `/reservation?storeId=1&date=${randomDate.toISOString()}`,
			accessToken
		});

		expect(response.status).toBe(200);
		expect(response.data.data[0]).toEqual({
			id: expect.any(Number),
			start_at: expect.any(String),
			finish_at: expect.any(String),
			status: randomReservationData.status,
			memo: 'Changed',
			employee: {
				id: 1,
				employee_name: '조인호',
				phone_number: '010-1234-1234'
			}
		});
	});

	test('중복된 예약 생성 시도 => 409', async () => {
		expect.assertions(1);

		const { store_id } = randomReservationData;
		const accessToken = await utils.getMasterAccessToken();

		const error = await utils.axiosCall({
			method: 'POST',
			data: {
				employee_id: 1,
				store_id: 1,
				start_at: randomDate.add(-30, 'minutes').toISOString(),
				finish_at: randomDate.add(30, 'minutes').toISOString(),
				memo: 'duplicated',
				status: 'ready'
			},
			endpoint: `/reservation?storeId=${store_id}&date=${randomDate.toISOString()}`,
			accessToken
		});

		expect(error.response.status).toBe(409);
	});
});