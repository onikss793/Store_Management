const controllers = require('./controllers');
const utils = require('./utils');

async function router(event) {
	const request = parseEndpoint(event);

	if (!controllers[request.route] || !controllers[request.route][request.method]) {
		return utils.throwError({
			statusCode: 404,
			name: 'Not Found',
			message: `Can't find ${request.method}: ${request.route} in the server`
		});
	}

	logs(event, request);

	return controllers[request.route][request.method](request);
}

module.exports = router;

function parseEndpoint(event) {
	const path = event.pathParameters.endpoint.split('/');
	const route = path[0];
	const request = {};

	if (path.length === 2) {
		request.resourceId = Number(path[1]);
	}
	if (
		event.httpMethod === 'POST' ||
		event.httpMethod === 'PUT' ||
		event.httpMethod === 'PATCH'
	) {
		const body = event.body;
		request.body = JSON.parse(body);
	}

	request.route = route;
	request.method = event.httpMethod;
	request.query = event.queryStringParameters;
	request.headers = event.headers;

	return request;
}

function logs(event, request) {
	console.log(`${event.requestContext.httpMethod} ${event.requestContext.identity.sourceIp}${event.path} ${event.requestContext.requestTime}`);
	console.log(request);
}
