const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { serviceController } = require('../controllers');

router.get('/:store_id', serviceController.getServiceListByStoreId);
router.post('/', serviceController.createService);

module.exports = {
	url: '/service',
	preMiddleware: [authMiddleware],
	runner: router
};
