const { Reservation } = require('../models');

const insertReservation = (data) => {
	return Reservation.create(data);
};

module.exports = { insertReservation };