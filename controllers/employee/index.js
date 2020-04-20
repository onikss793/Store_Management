const dao = require('../../dao'),
	utils = require('../../utils');

const createEmployee = async (req, res, next) => {
	try {
		const properties = ['employee_name', 'enrolled_in'];
		!utils.checkRequest(req, properties) && next(utils.throwError(400, 'Bad Request'));

		const store_id = req.store_id;
		const { employee_name, enrolled_in } = req.body;

		await dao.employee.insertEmployee({ employee_name, enrolled_in, store_id });

		res.status(200).json();
	} catch (err) {
		next(err);
	}
};

module.exports = { createEmployee };