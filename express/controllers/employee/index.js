const utils = require('../../utils');
const { renderResponseForList } = require('./helper');
const { createDatabase } = require('../../database');
const { Dao, query } = require('../../../dao');
const database = createDatabase();
const employeeDao = new Dao(database, 'Employee');
const vacationDao = new Dao(database, 'Vacation');

const createEmployee = async (req, res, next) => {
	let transaction;
	const properties = ['employee_name'];

	try {
		if (utils.checkRequest(req, properties)) {
			const store_id = req.store_id;
			const { employee_name } = req.body;

			transaction = await database.transaction();
			await employeeDao.insertOne({ employee_name, store_id }, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch (err) {
		if (transaction) {
			await transaction.rollback();
		}
		next(err);
	}
};

const getEmployeeListByStore = async (req, res, next) => {
	try {
		const store_id = req.query.store_id || req.store_id;
		const date = new Date(req.query.date || Date.now()).toISOString(); // "2020-05-31T15:00:00.000Z"
		const { selectEmployeesByStoreId } = query.employee;
		const data = await database.query(selectEmployeesByStoreId(store_id, date));
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
		if (transaction) {
			await transaction.rollback();
		}
		next(err);
	}
};

module.exports = { createEmployee, getEmployeeListByStore, createVacation };
