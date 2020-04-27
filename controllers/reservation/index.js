const reservationDao = require('../../dao').reservation,
	helper = require('./helper'),
	moment = require('moment');

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

		await reservationDao.insertReservation(data);

		res.status(200).json();
	} catch(err) {
		next(err);
	}
};

const getReservationList = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const date = moment(req.query.date); // "2020-05-31T15:00:00.000Z"

		const start_date = date.startOf('day').toISOString();
		const end_date = date.endOf('day').toISOString();

		const result = await reservationDao.selectReservation(store_id, start_date, end_date);
		const data = helper.convertRawToReservationList(result);

		res.status(200).json(data);
	} catch(err) {
		next(err);
	}
}

module.exports = { createReservation, getReservationList };
