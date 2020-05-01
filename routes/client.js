const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	clientController = require('../controllers/client');

const preMiddleware = [authMiddleware];
const url = '/client';

router.get('/:store_id', clientController.getClientListByStoreId)
router.post('/', clientController.createClient);
router.post('/:client_id', clientController.updateClient)

module.exports = { url, preMiddleware, router };