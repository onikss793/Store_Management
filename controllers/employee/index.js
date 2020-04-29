const employeeDao = require('../../dao').employee,
	utils = require('../../utils'),
	{ renderResponseForList } = require('./helper');

const createEmployee = async (req, res, next) => {
	try {
		const properties = ['employee_name', 'enrolled_in'];
		!utils.checkRequest(req, properties) && next(utils.throwError(400, 'Bad Request'));

		const store_id = req.store_id;
		const { employee_name, enrolled_in } = req.body;

		await employeeDao.insertEmployee({ employee_name, enrolled_in, store_id });

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

const getEmployeeListByStore = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const data = await employeeDao.selectEmployeesByStoreId(store_id).then(d => {
			return d.length && d.map(o => o.toJSON());
		});
		const response = renderResponseForList(data);

		res.status(200).json(response);
	} catch(err) {
		next(err);
	}
}

module.exports = { createEmployee, getEmployeeListByStore };