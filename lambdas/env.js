module.exports = () => {
	return {
		SM_STAGE: process.env.SM_STAGE,
		NODE_ENV: process.env.NODE_ENV,
		SECRET_KEY: process.env.SECRET_KEY,
	}
}
