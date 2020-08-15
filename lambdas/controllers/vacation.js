const Controller = require('./controller');
const { VacationService } = require('../../services');
const utils = require('../utils');

class VacationController extends Controller {
	vacationService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['employee_id', 'start_at', 'finish_at']);
		this.setService('vacationService', VacationService);
	}

	post = async (request) => {
		let transaction;

		try {
			this.bodyCheck(request);
			const vacationData = request.body;

			const duplicatedVacation = await this.vacationService.getDuplicatedVacation(vacationData);

			if (duplicatedVacation) {
				return utils.makeError({
					statusCode: 409,
					message: 'The Vacation Already Exists',
					name: 'Conflicts'
				});
			}

			const transaction = await this.database.transaction();
			await this.vacationService.createVacation(vacationData, transaction);
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

	// /vacation?storeId=1
	get = async (request) => {
		try {
			const storeId = request.query['storeId'];
			if (!storeId) {
				return utils.makeError({
					statusCode: 400,
					message: 'Request should have querystring storeId',
					name: 'No Querystring'
				});
			}
			const data = await this.vacationService.getAllVacationsByStoreId(storeId);

			return utils.response({
				body: { data }
			});
		} catch (err) {
			console.error(err);
			return utils.throwError(err);
		}
	};
}

module.exports = () => new VacationController();
