const router = require('express').Router(),
	storeController = require('../controllers/store'),
	authMiddleware = require('../middlewares/auth');

const preMiddleware = [authMiddleware];
const url = '/store';

router.get('/', storeController.storeList);
router.post('/', storeController.createStore);

module.exports = { url, router, preMiddleware };