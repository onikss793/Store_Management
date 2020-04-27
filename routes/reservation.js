const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	reservationController = require('../controllers/reservation');

const preMiddleware = [authMiddleware];
const url = '/reservation';

router.post('/', reservationController.createReservation);
router.post('/:store_id', reservationController.getReservationList) // querystring data=timestamp

module.exports = { url, router, preMiddleware };