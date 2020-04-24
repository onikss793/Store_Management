const reservationDao = require('../../dao').reservation;

const createReservation = async (req, res, next) => {
	try {
		const store_id = req.store_id;
		const { employee_id, client_id, service_id, start_at, finish_at, memo } = req.body;
		const data = {
			employee_id,
			client_id,
			service_id,
			start_at,
			finish_at,
			store_id,
			memo
		};

		const result = await reservationDao.insertReservation(data);
		console.log(result.toJSON());
		res.status(200).json();
	} catch(err) {
		next(err);
	}
};

module.exports = { createReservation };
