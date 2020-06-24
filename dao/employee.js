const selectEmployeesByStoreId = (store_id, date) => `
	SELECT
		EMPLOYEE.id AS id,
		EMPLOYEE.employee_name AS employee_name,
		EMPLOYEE.enrolled_in AS enrolled_in,
		EMPLOYEE.store_id AS store_id,
			CASE WHEN VACATION.start_at <= "${date}"
				AND VACATION.finish_at >= "${date}"
			THEN 'true'
			ELSE 'false'
			END AS vacation
	FROM
		employees AS EMPLOYEE
	LEFT JOIN 
			vacations AS VACATION 
		ON 
			EMPLOYEE.id = VACATION.employee_id 
			AND VACATION.deleted_at IS NULL
	WHERE
		EMPLOYEE.deleted_at IS NULL AND EMPLOYEE.store_id = ${store_id}`;

module.exports = { selectEmployeesByStoreId };
