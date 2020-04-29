const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	reservationController = require('../controllers/reservation');

const preMiddleware = [authMiddleware];
const url = '/reservation';

router.get('/:store_id', reservationController.getReservationList) // querystring data=timestamp
router.post('/', reservationController.createReservation);

module.exports = { url, router, preMiddleware };