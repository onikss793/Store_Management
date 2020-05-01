const jwt = require('jsonwebtoken'),
	utils = require('../utils'),
	storeDao = require('../dao').store;

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test');

		const storeData = await storeDao.selectStore({ id: decoded.id }).then(d => d && d.toJSON());

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
		next(utils.throwError(401, `Authorization Fail: ${ err.message }`));
	}
};
