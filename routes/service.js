const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	serviceController = require('../controllers/service');

const preMiddleware = [authMiddleware];
const url = '/service';

router.get('/:store_id', serviceController.getServiceListByStoreId)
router.post('/', serviceController.createService);

module.exports = { url, preMiddleware, router };