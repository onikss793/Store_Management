const jwt = require('jsonwebtoken');
const { createDatabase } = require('../database');
const { Dao } = require('../../dao');
const database = createDatabase();
const storeDao = new Dao(database, 'Store');

const checkIfAdmin = storeData => {
	return storeData.is_admin;
};

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
        if (!token) {
            throw new Error('AUTHORIZATION_FAILED');
        }
		const decoded = jwt.verify(token, process.env.SECRET_KEY || 'test');

		const storeData = await storeDao.selectOne({ id: decoded.id }).then(d => d && d.toJSON());

        if (!storeData) {
            throw new Error('AUTHORIZATION_FAILED');
        }

		req.is_admin = !!checkIfAdmin(storeData);
		req.store_id = decoded.id;
		next();
	} catch (err) {
		next(err);
	}
};
