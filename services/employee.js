const { Dao, query } = require('../dao');

class EmployeeService {
	constructor(database) {
		this.database = database;
		this.employeeDao = new Dao(database, 'Employee');
	}

	async createEmployee(employeeData, transaction) {
		return this.employeeDao.insertOne(employeeData, transaction);
	}

	async getEmployeesByStoreId(storeId, date) {
		const { selectEmployeesByStoreId } = query.employee;
		const employeeData = await this.database.query(selectEmployeesByStoreId(storeId, date));

		return employeeData.map(({ id, employee_name, vacation }) => {
			return {
				id,
				employee_name,
				vacation: vacation === 'true'
			}
		})
	}
}

module.exports = EmployeeService;