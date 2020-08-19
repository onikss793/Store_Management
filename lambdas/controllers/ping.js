const utils = require('../utils');

module.exports = {
	get: () => {
		try {
			return utils.response({
				body: {
					message: 'PONG'
				}
			});
		} catch (e) {
			return utils.throwError(e);
		}
	}
};
