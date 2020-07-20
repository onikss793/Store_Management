const moment = require('moment');
const { Dao, query } = require('../dao');

class VacationService {
	constructor(database) {
		this.database = database;
		this.vacationDao = new Dao(database, 'Vacation');
	}

	async createVacation(vacationData, transaction) {
		return this.vacationDao.upsertOne(vacationData, transaction);
	}

	async getDuplicatedVacation(vacationData) {
		const { selectDuplicatedVacation } = query.vacation;
		const employeeId = vacationData['employee_id'];
		const startAt = moment(vacationData['start_at']).toISOString();
		const finishAt = moment(vacationData['finish_at']).toISOString();

		return await this.database.query(selectDuplicatedVacation(employeeId, startAt, finishAt));
	}

	async getAllVacationsByStoreId(storeId) {
		const { selectVacationByStoreId } = query.vacation;

		const storeData = await this.database.query(selectVacationByStoreId(storeId));

		return storeData.map(({
			id,
			start_at,
			finish_at,
			employee_id,
			employee_name,
			employee_phone_number
		}) => {
			return {
				id,
				start_at,
				finish_at,
				employee: {
					id: employee_id,
					employee_name,
					phone_number: employee_phone_number
				}
			};
		});
	}
}

module.exports = VacationService;