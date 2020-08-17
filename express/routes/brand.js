const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { brandController } = require('../controllers');

router.get('/', brandController.getBrandList);
router.post('/', brandController.createBrand);

module.exports = {
	url: '/brand',
	preMiddleware: [authMiddleware],
	runner: router
};
