const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { reservationController } = require('../controllers');

router.get('/:store_id', reservationController.getReservationList); // querystring data=timestamp
router.post('/', reservationController.createReservation);
router.post('/:reservation_id', reservationController.updateReservation);

module.exports = {
	url: '/reservation',
	preMiddleware: [authMiddleware],
	runner: router
};
