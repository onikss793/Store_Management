module.exports = () => {
	return {
		STAGE: process.env.SM_STAGE,
		NODE_ENV: process.env.NODE_ENV,
		SLS_DEBUG: '*'
	}
}
