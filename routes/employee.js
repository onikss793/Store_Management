const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	employeeController = require('../controllers/employee');

const preMiddleware = [authMiddleware];
const url = '/employee';

router.post('/', employeeController.createEmployee);

module.exports = { url, preMiddleware, router };