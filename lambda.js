const routers = require('./lambdas/router');
const utils = require('./lambdas/utils');

async function handler(event, context) {
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

module.exports = { handler };