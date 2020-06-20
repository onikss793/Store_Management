const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { storeController } = require('../controllers');

router.get('/', storeController.storeList);
router.post('/', storeController.createStore);

module.exports = {
	url: '/store',
	preMiddleware: [authMiddleware],
	runner: router
};
