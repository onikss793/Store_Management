const Controller = require('./controller');
const { ReservationService } = require('../services');
const utils = require('../utils');

class ReservationController extends Controller {
	reservationService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['employee_id', 'store_id', 'start_at', 'finish_at', 'status', 'memo']);
		this.setService('reservationService', ReservationService);
	}

	post = async (request) => {
		let transaction;

		try {
			this.bodyCheck(request);
			const reservationData = request.body;

			transaction = await this.database.transaction();
			await this.reservationService.createReservation(reservationData, transaction);
			await transaction.commit();

			return utils.response({
				body: { success: true }
			});
		} catch (err) {
			if (transaction) await transaction.rollback();
			console.error(err);
			return utils.throwError(err);
		}
	}

	// /reservation?storeId=1&date=2020-05-01T15:38:29.821Z
	get = async (request) => {
		try {
			const storeId = request.query['storeId'];
			const date = request.query['date'];

			const data = await this.reservationService.getReservationList(storeId, date);

			return utils.response({
				body: { data }
			})
		} catch (err) {
			console.error(err);
			return utils.throwError(err);
		}
	}
}

module.exports = () => new ReservationController();