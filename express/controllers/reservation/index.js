const utils = require('../../utils');
const helper = require('./helper');
const moment = require('moment');
const { database } = require('../../database');
const { Dao, query } = require('../../../dao');

const reservationDao = new Dao(database, 'Reservation');

const createReservation = async (req, res, next) => {
	let transaction;
	const properties = [
		'employee_id',
		// 'client_id',
		// 'service_id',
		'start_at',
		'finish_at',
		'memo'
	];

	try {
		if (utils.checkRequest(req, properties)) {
			const store_id = req.store_id;
			const { employee_id, start_at, finish_at, memo } = req.body;
			const data = {
				store_id,
				employee_id,
				memo,
				start_at,
				finish_at
			};

			transaction = await database.transaction();
			await reservationDao.insertOne(data, transaction);
			await transaction.commit();

			res.status(200).json(utils.postResponse());
		} else {
			next(utils.throwError(400, 'Bad Request'));
		}
	} catch(err) {
		if (transaction) {
			await transaction.rollback();
		}
		next(err);
	}
};

const getReservationList = async (req, res, next) => {
	try {
		const { selectReservation } = query.reservation;
		const store_id = req.params.store_id;
		const date = moment(req.query.date); // "2020-05-31T15:00:00.000Z"

		const start_date = date.startOf('day').toISOString();
		const end_date = date.endOf('day').toISOString();

		const result = await database.query(selectReservation(store_id, start_date, end_date));
		const data = helper.convertRawToReservationList(result);

		res.status(200).json(data);
	} catch(err) {
		next(err);
	}
};

const updateReservation = async (req, res, next) => {
	let transaction;

	try {
		const reservation_id = req.params.reservation_id;
		const data = req.body;

		transaction = await database.transaction();
		await reservationDao.updateOne({ id: reservation_id }, { ...data }, transaction);
		await transaction.commit();

		res.status(200).json(utils.postResponse());
	} catch(err) {
		if (transaction) {
			await transaction.rollback();
		}
		next(err);
	}
};

module.exports = { createReservation, getReservationList, updateReservation };
