const utils = require('../../utils');
const { renderResponseForList } = require('./helper');
const { database } = require('../../database');
const { Dao, query } = require('../../dao');

const employeeDao = new Dao(database, 'Employee');
const vacationDao = new Dao(database, 'Vacation');

const createEmployee = async (req, res, next) => {
	let transaction;
	const properties = ['employee_name', 'enrolled_in'];

	try {
		if (utils.checkRequest(req, properties)) {
			const store_id = req.store_id;
			const { employee_name, enrolled_in } = req.body;

			transaction = await database.transaction();
			await employeeDao.insertOne({ employee_name, enrolled_in, store_id }, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};

const getEmployeeListByStore = async (req, res, next) => {
	try {
		const store_id = req.params.store_id;
		const { selectEmployeesByStoreId } = query.employee;
		const data = await database.query(selectEmployeesByStoreId(store_id));
		const response = renderResponseForList(data);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const createVacation = async (req, res, next) => {
	let transaction;
	const properties = ['employee_id', 'start_at', 'finish_at'];

	try {
		if (utils.checkRequest(req, properties)) {
			const { employee_id, start_at, finish_at } = req.body;

			transaction = await database.transaction();
			await vacationDao.insertOne({ employee_id, start_at, finish_at }, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch (err) {
		if (transaction) await transaction.rollback();
		next(err);
	}
};

module.exports = { createEmployee, getEmployeeListByStore, createVacation };
