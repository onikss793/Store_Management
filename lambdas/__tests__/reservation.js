const utils = require('../test-utils');
const moment = require('moment');

const newReservationData = {
	employee_id: 1,
	store_id: 1,
	start_at: moment().toISOString(),
	finish_at: moment().add(1, 'hours').toISOString(),
	status: 'ready',
	memo: 'VIP'
};

describe('예약 등록 > 확인', () => {
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
	})
});