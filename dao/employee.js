const { Employee, Vacation } = require('../models'),
	{ QueryTypes } = require('sequelize'),
	Sequelize = require('../database');

const selectEmployeesByStoreId = (store_id) => {
	return Sequelize.query(`
		SELECT
			e.id AS id,
			e.employee_name AS employee_name,
			e.enrolled_in AS enrolled_in,
			e.store_id AS store_id,
				CASE WHEN v.start_at <= CURRENT_TIMESTAMP
					AND v.finish_at >= CURRENT_TIMESTAMP
					THEN 'true'
				ELSE 'false'
				END AS vacation
		FROM
			employees AS e
		LEFT JOIN vacations AS v ON e.id = v.employee_id
		WHERE
			e.deleted_at IS NULL AND e.store_id = ${ store_id }
	`, { types: QueryTypes.SELECT, model: Employee });
	// return Employee.findAll({ where: { store_id } });
};

const insertEmployee = (data) => {
	return Employee.create(data);
};

const insertVacation = (data, transaction) => {
	return Vacation.create(data, { transaction });
};

module.exports = { insertEmployee, selectEmployeesByStoreId, insertVacation };