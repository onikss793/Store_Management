const selectDuplicatedVacation = (employeeId, startAt, finishAt) => `
	SELECT
        id
    FROM vacations
    WHERE employee_id = ${employeeId}
    AND "${startAt}" BETWEEN start_at AND finish_at
	OR "${finishAt}" BETWEEN start_at AND finish_at
	OR ("${startAt}" <= start_at AND "${finishAt}" >= finish_at)
    AND deleted_at IS NULL
`;

const selectVacationByStoreId = (storeId) => `
	SELECT
		VACATION.id AS id,
		VACATION.start_at AS start_at,
		VACATION.finish_at AS finish_at,
		EMPLOYEE.id AS employee_id,
		EMPLOYEE.employee_name AS employee_name,
		EMPLOYEE.phone_number AS employee_phone_number
	FROM
		vacations AS VACATION
	LEFT JOIN employees AS EMPLOYEE ON (VACATION.employee_id = EMPLOYEE.id)
	LEFT JOIN stores AS STORE ON (EMPLOYEE.store_id = STORE.id)
	WHERE STORE.id = ${storeId}
	AND VACATION.deleted_at IS NULL
	AND EMPLOYEE.deleted_at IS NULL
	AND STORE.deleted_at IS NULL
`;

module.exports = { selectDuplicatedVacation, selectVacationByStoreId };