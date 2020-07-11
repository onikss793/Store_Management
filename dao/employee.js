const selectEmployeesByStoreId = (store_id, date) => `	
	SELECT
        EMPLOYEE.id AS id,
        EMPLOYEE.employee_name AS employee_name,
        EMPLOYEE.phone_number AS phone_number,
        IF(VACATION.id IS NOT NULL, "true", "false") AS vacation
    FROM employees AS EMPLOYEE
    LEFT JOIN vacations AS VACATION
        ON (EMPLOYEE.id = VACATION.employee_id 
        AND "${date}" BETWEEN VACATION.start_at AND VACATION.finish_at)
    WHERE EMPLOYEE.store_id = ${store_id}
    AND EMPLOYEE.deleted_at IS NULL
    AND VACATION.deleted_at IS NULL
`;

module.exports = { selectEmployeesByStoreId };
