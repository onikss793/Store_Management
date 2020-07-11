// const selectReservation = (store_id, start_date, end_date) => `
// 	SELECT
// 		RESERVATION.id AS id,
// 		RESERVATION.employee_id AS employee_id,
// 		RESERVATION.client_id AS client_id,
// 		RESERVATION.service_id AS service_id,
// 		RESERVATION.start_at AS start_at,
// 		RESERVATION.finish_at AS finish_at,
// 		RESERVATION.status AS status,
// 		RESERVATION.memo AS memo,
// 		EMPLOYEE.employee_name AS employee_name,
// 		CLIENT.client_name AS client_name,
// 		CLIENT.phone_number AS phone_number,
// 		CLIENT.info AS info,
// 		SERVICE.service_name AS service_name,
// 		SERVICE.color AS color
// 	FROM reservations AS RESERVATION
// 		LEFT JOIN
// 			employees AS EMPLOYEE ON RESERVATION.employee_id = EMPLOYEE.id
// 		LEFT JOIN
// 			clients AS CLIENT ON RESERVATION.client_id = CLIENT.id
// 		LEFT JOIN
// 			services AS SERVICE ON RESERVATION.service_id = SERVICE.id
// 	WHERE RESERVATION.store_id = ${store_id}
// 		AND RESERVATION.deleted_at IS NULL
// 		AND RESERVATION.start_at >= "${start_date}"
// 		AND RESERVATION.finish_at <= "${end_date}"
// 	ORDER BY RESERVATION.start_at`;

const selectReservation = (storeId, startAt, finishAt) => `
	SELECT
        RESERVATION.id AS id,
        RESERVATION.start_at AS start_at,
        RESERVATION.finish_at AS finish_at,
        RESERVATION.status AS status,
        RESERVATION.memo AS memo,
        RESERVATION.created_at AS created_at,
        RESERVATION.updated_at AS updated_at,
        EMPLOYEE.id AS employee_id,
        EMPLOYEE.employee_name AS employee_name,
        EMPLOYEE.phone_number AS employee_phone_number,
        EMPLOYEE.created_at AS employee_created_at,
        EMPLOYEE.updated_at AS employee_updated_at
    FROM reservations AS RESERVATION
        LEFT JOIN
            employees AS EMPLOYEE ON RESERVATION.employee_id = EMPLOYEE.id
    WHERE RESERVATION.store_id = ${storeId}
        AND RESERVATION.deleted_at IS NULL
        AND RESERVATION.start_at >= "${startAt}"
        AND RESERVATION.finish_at <= "${finishAt}" 
    ORDER BY RESERVATION.start_at
`;

module.exports = { selectReservation };
