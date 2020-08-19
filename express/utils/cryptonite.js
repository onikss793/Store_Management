const crypto = require('crypto'),
	{ SECRET_KEY } = require('../../config/secret');

module.exports = (password) => {
	return crypto.pbkdf2Sync(password, SECRET_KEY, 100000, 64, 'sha256').toString('hex');
};
