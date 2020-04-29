const router = require('express').Router(),
	authMiddleware = require('../middlewares/auth'),
	employeeController = require('../controllers/employee');

const preMiddleware = [authMiddleware];
const url = '/employee';

router.get('/:store_id', employeeController.getEmployeeListByStore)
router.post('/', employeeController.createEmployee);
router.post('/vacation', employeeController.createVacation)

module.exports = { url, preMiddleware, router };