const router = require('express').Router();
const { accountController } = require('../controllers');

router.post('/', accountController.login);

module.exports = {
	url: '/account',
	preMiddleware: [],
	runner: router
};
