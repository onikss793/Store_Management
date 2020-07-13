const crypto = require('crypto');
const { SECRET_KEY } = require('../config/secret');

function slsHeaders(event) {
	if (!Object.prototype.hasOwnProperty.call(event, 'headers')) {
		event.headers = {};
		return false;
	}

	for (const key in event.headers) {
		event.headers[key.toLowerCase()] = event.headers[key];
	}
	return true;
}

function corsHeaders(origin) {
	if (origin !== undefined && allowedDomain(origin)) {
		return {
			'Access-Control-Allow-Origin': origin,
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, x-Requested-With, Accept, Origin',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
		};
	} else {
		return {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type, Content-Length, x-Requested-With, Accept, Authorization',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
		};
	}
}

function response({ statusCode = 200, body }) {
	return {
		statusCode,
		headers: {
			...corsHeaders()
		},
		body: JSON.stringify(body)
	};
}

const allowed = [
	/http:\/\/localhost:[0-9]+/,
	/http:\/\/127\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/,
];

function allowedDomain() {
	for (const r of allowed) {
		if (origin.match(r) !== null) {
			return true;
		}
	}
	return false;
}

function throwError(occurredError) {
	return {
		statusCode: occurredError.statusCode || 500,
		body: JSON.stringify({
			error: {
				name: occurredError.name || 'Unknown Error',
				message: occurredError.message || 'Internal Server Error'
			}
		})
	};
}

function checkRequest(request, properties = []) {
	const body = request.body;

	for (const prop of properties) {
		const key = body[prop];

		if (typeof key === 'string') {
			if (!key || !key.length) {
				return false;
			}
		}

		if (typeof key === 'number') {
			if (key < 0) {
				return false;
			}
		}

		if (typeof key === 'undefined') {
			return false;
		}

		if (key === null) {
			return false;
		}
	}

	return true;
}

function cryptonite(password) {
	return crypto.pbkdf2Sync(password, SECRET_KEY, 100000, 64, 'sha256').toString('hex');
}

function makeError({ statusCode = null, name = null, message = null }) {
	const error = new Error(message);
	error.statusCode = statusCode;
	error.name = name;

	return throwError(error);
}

function getStoreIdFromAccountAndParam(resourceId, accountId, isAdmin) {
	const storeId = resourceId && Number(resourceId);

	if (isAdmin) {
		console.log('Admin');
		return storeId;
	}

	if (storeId === accountId) {
		console.log('Normal');
		return storeId;
	}

	return null;
}

module.exports = {
	slsHeaders,
	corsHeaders,
	response,
	throwError,
	checkRequest,
	cryptonite,
	makeError,
	getStoreIdFromAccountAndParam
};