const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	serviceController = require('../controllers/service');

const preMiddleware = [authMiddleware];
const url = '/service';

router.post('/', serviceController.createService);

module.exports = { url, preMiddleware, router };