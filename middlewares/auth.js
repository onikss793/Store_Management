const jwt = require('jsonwebtoken'),
      utils = require('../utils');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test');

		req.store_id = decoded.id;
		next();
	} catch(err) {
		next(utils.throwError(401, `Authorization Fail: ${err.message}`));
	}
}
