const dotenv = require('dotenv');

module.exports = () => {
	const result = dotenv.config();
	if (result.error) {
		throw result.error
	}

	return {
		SM_STAGE: process.env.SM_STAGE,
		NODE_ENV: process.env.NODE_ENV,
		SECRET_KEY: process.env.SECRET_KEY,
	};
};
