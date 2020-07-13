const Controller = require('./controller');
const { EmployeeService } = require('../services');
const utils = require('../utils');

class EmployeeController extends Controller {
	employeeService;

	constructor() {
		super();
		this.setDatabase();
		this.setProperties(['employee_name', 'phone_number', 'store_id']);
		this.setService('employeeService', EmployeeService);
	}

	post = async request => {
		let transaction;

		try {
			this.bodyCheck(request);
			const employeeData = request.body;

			transaction = await this.database.transaction();
			await this.employeeService.createEmployee(employeeData, transaction);
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
	// /employee?storeId=1&date=2020-05-31T15:00:00.000Z
	get = async request => {
		try {
			const storeId = request.query['storeId'];
			const date = new Date(request.query['date'] || Date.now()).toISOString(); // "2020-05-31T15:00:00.000Z"

			const data = await this.employeeService.getEmployeesByStoreId(storeId, date);

			return utils.response({
				body: { data }
			});
		} catch (err) {
			console.error(err);
			return utils.throwError(err);
		}
	};
}

module.exports = () => new EmployeeController();