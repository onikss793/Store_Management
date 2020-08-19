const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { clientController } = require('../controllers');

router.get('/:store_id', clientController.getClientListByStoreId);
router.post('/', clientController.createClient);
router.post('/:client_id', clientController.updateClient);

module.exports = {
	url: '/client',
	preMiddleware: [authMiddleware],
	runner: router
};
