const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { employeeController } = require('../controllers');

router.get('/:store_id', employeeController.getEmployeeListByStore)
router.post('/', employeeController.createEmployee);
router.post('/vacation', employeeController.createVacation)

module.exports = {
	url: '/employee',
	preMiddleware: [authMiddleware],
	runner: router
};
