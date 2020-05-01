const { Reservation } = require('../models'),
	{ QueryTypes } = require('sequelize'),
	Sequelize = require('../database');

const simpleSelectReservation = (reservation_id) => {
	return Reservation.findByPk(reservation_id);
}

const selectReservation = (store_id, start_date, end_date) => {
	return Sequelize.query(`
		SELECT
			r.id AS id,
			r.employee_id AS employee_id,
			r.client_id AS client_id,
			r.service_id AS service_id,
			r.start_at AS start_at,
			r.finish_at AS finish_at,
			r.status AS status,
			r.memo AS memo,
			e.employee_name AS employee_name,
			c.client_name AS client_name,
			c.phone_number AS phone_number,
			c.info AS info,
			s.service_name AS service_name,
			s.color AS color
		FROM reservations AS r
			LEFT JOIN 
				employees AS e ON r.employee_id = e.id
			LEFT JOIN
				clients AS c ON r.client_id = c.id
			LEFT JOIN
				services AS s ON r.service_id = s.id
		WHERE r.store_id = ${ store_id }
		AND r.deleted_at IS NULL
		AND r.start_at >= '${ start_date }'
		AND r.finish_at <= '${ end_date }' 
		ORDER BY r.start_at
	`, {
		types: QueryTypes.SELECT,
		model: Reservation
	});
};

const selectAll = () => {
	return Sequelize.query(`
	SELECT 
		* 
	FROM reservations 
	`, { types: QueryTypes.SELECT, model: Reservation });
};

const insertReservation = (data) => {
	return Reservation.create(data);
};

const updateReservation = (reservation_id, data) => {
	return Reservation.update({ ...data }, { where: { id: reservation_id } });
};

module.exports = { insertReservation, selectReservation, selectAll, updateReservation, simpleSelectReservation };