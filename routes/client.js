const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	clientController = require('../controllers/client');

const preMiddleware = [authMiddleware];
const url = '/client';

router.get('/:store_id', clientController.getClientListByStoreId)
router.post('/', clientController.createClient);

module.exports = { url, preMiddleware, router };