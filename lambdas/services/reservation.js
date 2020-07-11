const moment = require('moment');
const { Dao, query } = require('../../dao');

class ReservationService {
	constructor(database) {
		this.database = database;
		this.reservationDao = new Dao(database, 'Reservation');
	}

	async createReservation(reservationData, transaction) {
		return this.reservationDao.upsertOne(reservationData, transaction);
	}

	async getReservationList(storeId, date) {
		const { selectReservation } = query.reservation;

		date = moment(date);
		const startAt = date.startOf('day').toISOString();
		const finishAt = date.endOf('day').toISOString();

		const reservationData = await this.database.query(selectReservation(storeId, startAt, finishAt));

		if (reservationData.length) {
			return reservationData.map(({
				id,
				start_at,
				finish_at,
				status,
				memo,
				employee_id,
				employee_name,
				employee_phone_number
			}) => {
				return {
					id,
					start_at,
					finish_at,
					status,
					memo,
					employee: {
						id: employee_id,
						employee_name,
						phone_number: employee_phone_number
					}
				};
			});
		} else {
			return [];
		}
	}
}

module.exports = ReservationService;