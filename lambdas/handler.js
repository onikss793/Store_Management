const routers = require('./router');
const utils = require('./utils');

async function index(event, context) {
	if (!utils.slsHeaders(event)) {
		return { body: '' };
	}

	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers: utils.corsHeaders(event.headers.origin)
		};
	}

	return await routers(event);
}

module.exports = { index };