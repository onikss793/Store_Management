const moment = require('moment');
const { Dao, query } = require('../dao');
const { Op } = require('sequelize');

class ReservationService {
	constructor(database) {
		this.database = database;
		this.reservationDao = new Dao(database, 'Reservation');
	}

	async createReservation(reservationData, transaction) {
		reservationData.start_at = moment(reservationData.start_at).toISOString();
		reservationData.finish_at = moment(reservationData.finish_at).toISOString();
		return this.reservationDao.insertOne(reservationData, transaction);
	}

	async updateReservation(reservationId, reservationData, transaction) {
		const index = { id: Number(reservationId) };
		reservationData.start_at = moment(reservationData.start_at).toISOString();
		reservationData.finish_at = moment(reservationData.finish_at).toISOString();

		return this.reservationDao.updateOne(index, reservationData, transaction);
	}

	async isDuplicated(reservationData) {
		const { lte, gte, and, is } = Op;
		const startOfToday = moment(reservationData.start_at).utc(true).startOf('day').toISOString();
		const endOfToday = moment(reservationData.finish_at).utc(true).endOf('day').toISOString();
		const index = {
			employee_id: reservationData.employee_id,
			status: 'ready',
			[and]: [
				{ start_at: { [gte]: startOfToday } },
				{ finish_at: { [lte]: endOfToday } }
			],
			deleted_at: {
				[is]: null
			}
		};
		const attributes = ['id', 'start_at', 'finish_at'];
		const reservationList = await this.reservationDao.selectAll(index, attributes);

		return reservationList.find(data => {
			const startAt = moment(reservationData.start_at);
			const finishAt = moment(reservationData.finish_at);

			if ((startAt.isBetween(data.start_at, data.finish_at) || finishAt.isBetween(data.start_at, data.finish_at)) || (startAt.isBefore(data.start_at) && finishAt.isAfter(data.finish_at))) {
				return data;
			}
		});
	}

	async getReservationList(storeId, date) {
		const { selectReservation } = query.reservation;

		const timeData = moment(date).utc(true);
		const startOfToday = timeData.startOf('day').toISOString();
		const endOfToday = timeData.endOf('day').toISOString();

		const reservationData = await this.database.query(selectReservation(storeId, startOfToday, endOfToday));

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
