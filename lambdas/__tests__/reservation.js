const utils = require('../test-utils');
const moment = require('moment');
const STANDARD = moment();

let newReservationData = {
	employee_id: 1,
	store_id: 1,
	start_at: STANDARD.toISOString(),
	finish_at: STANDARD.add(1, 'hours').toISOString(),
	status: 'ready',
	memo: 'VIP'
};

describe('예약 등록 > 확인 > 변경 > 목록', () => {
	beforeAll(async () => {
		await utils.setMasterStore();
	});
	afterAll(async () => {
		await utils.forceDatabase();
	});

	test('새로운 예약을 만든다', async () => {
		const { store_id } = newReservationData;
		const accessToken = await utils.getMasterAccessToken();

		const response = await utils.axiosCall({
			method: 'POST',
			data: newReservationData,
			endpoint: `/reservation?storeId=${store_id}&date=${moment().toISOString()}`,
			accessToken
		});

		expect(response.status).toBe(200);
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
		`);

		expect(reservationData).toEqual({
			id: expect.any(Number),
			employee_id: 1,
			store_id: 1,
			start_at: expect.any(Date),
			finish_at: expect.any(Date),
			status: newReservationData.status,
			memo: newReservationData.memo,
		});
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
		`);

		const reservationId = reservationData.id;
		const updatingData = {
			...reservationData,
			memo: 'Changed'
		};
		newReservationData = updatingData;

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
		`);
		const { employee_id, store_id, start_at, finish_at, status } = updatingData;

		expect(response.status).toBe(200);
		expect(result).toEqual({
			id: reservationId,
			employee_id,
			store_id,
			start_at: start_at,
			finish_at: finish_at,
			status,
			memo: updatingData.memo,
		});
	});

	test('예약 목록 확인', async () => {
		await utils.database.query(`
			INSERT INTO employees
				(id, employee_name, store_id, phone_number)
			VALUES
				(1, "test", 1, "010-1234-1234")
		`);
		const accessToken = await utils.getMasterAccessToken();
		const response = await utils.axiosCall({
			endpoint: `/reservation?storeId=1&date=${moment().toISOString()}`,
			accessToken
		});

		expect(response.status).toBe(200);
		expect(response.data.data.length).toBe(1);
		expect(response.data.data[0]).toEqual({
			id: 1,
			start_at: moment(newReservationData.start_at).toISOString(),
			finish_at: moment(newReservationData.finish_at).toISOString(),
			status: newReservationData.status,
			memo: 'Changed',
			employee: {
				id: 1,
				employee_name: 'test',
				phone_number: '010-1234-1234'
			}
		});
	});

	// test('중복된 예약 생성 시도 => 409', async () => {
	// 	try {
	// 		const { store_id } = newReservationData;
	// 		const accessToken = await utils.getMasterAccessToken();
	//
	// 		const response = await utils.axiosCall({
	// 			method: 'POST',
	// 			data: {
	// 				employee_id: 1,
	// 				store_id: 1,
	// 				start_at: STANDARD.add(30, 'minutes').toISOString(),
	// 				finish_at: STANDARD.add(1, 'hours').toISOString(),
	// 				memo: 'duplicated',
	// 				status: 'ready'
	// 			},
	// 			endpoint: `/reservation?storeId=${store_id}&date=${moment().toISOString()}`,
	// 			accessToken
	// 		});
	//
	// 		expect(response.status).toBe(409);
	// 	} catch (err) {
	// 		console.log(err);
	// 		expect(err.response.status).toBe(409);
	// 	}
	// });
});