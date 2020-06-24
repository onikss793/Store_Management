const jwt = require('jsonwebtoken');
const { database } = require('../database');
const { Dao } = require('../dao');
const storeDao = new Dao(database, 'Store');

const checkIfAdmin = (storeData) => {
	return storeData.is_admin;
}

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test');

		const storeData = await storeDao.selectOne({ id: decoded.id }).then(d => d && d.toJSON());

		req.is_admin = !!checkIfAdmin(storeData);
		req.store_id = decoded.id;
		next();
	} catch (err) {
		const error = new Error(`Authorization Fail: ${err.message}`);
		error.code = 401;
		throw error;
	}
};
