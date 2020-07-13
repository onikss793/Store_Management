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
	};

	// /reservation?storeId=1&date=2020-05-01T15:38:29.821Z
	get = async (request) => {
		try {
			const date = request.query['date'];
			const accountId = request.accountId;
			const resourceId = request.query['storeId'];
			const isAdmin = request.isAdmin;
			const storeId = utils.getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin);

			// storeId 없이 예약 목록을 가져올 수는 없다. 만약 storeId가 null이라면 해당 매장에 대한 권한이 없는 것.
			if (!storeId) {
				return utils.makeError({
					statusCode: 403,
					name: 'Forbidden',
					message: 'You have no access'
				});
			}

			const data = await this.reservationService.getReservationList(storeId, date);

			return utils.response({
				body: { data }
			});
		} catch (err) {
			console.error(err);
			return utils.throwError(err);
		}
	};
}

module.exports = () => new ReservationController();