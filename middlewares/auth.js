const jwt = require('jsonwebtoken');
const { database } = require('../database');
const { Dao } = require('../dao');
const storeDao = new Dao(database, 'Store');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test');

		const storeData = await storeDao.selectOne({ id: decoded.id }).then(d => d && d.toJSON());

		if (storeData.id === 1 || storeData.id === 2) {
			req.superuser = true;
			req.is_admin = true;
		} else {
			req.superuser = false;
			req.is_admin = storeData.is_admin;
		}

		req.store_id = decoded.id;
		next();
	} catch (err) {
		const error = new Error(`Authorization Fail: ${err.message}`);
		error.code = 401;
		throw error;
	}
};
