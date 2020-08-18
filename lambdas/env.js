const dotenv = require('dotenv');
const { resolve } = require('path');

module.exports = () => {
	if (process.env.SM_STAGE === 'production') {
		const result = dotenv.config({ path: resolve(__dirname, '../.production.env') });
		if (result.error) {
			throw result.error;
		}
	} else {
		const result = dotenv.config();
		if (result.error) {
			throw result.error;
		}
	}

	return {
		NODE_ENV: process.env.NODE_ENV,
		SECRET_KEY: process.env.SECRET_KEY,
		SALT_ROUNDS: process.env.SALT_ROUNDS
	};
};
