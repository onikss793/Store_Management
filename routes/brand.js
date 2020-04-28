const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	brandController = require('../controllers/brand');

const preMiddleware = [authMiddleware];
const url = '/brand';

router.post('/', brandController.createBrand);

module.exports = { url, router, preMiddleware };
