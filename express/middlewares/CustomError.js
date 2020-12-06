const errorMessages = {
	'BAD_REQUEST': 'Check Input',
	'AUTHORIZATION_FAILED': 'Authorization has been failed. Try again',
	CONFLICT: 'What you request is duplicated',
	'UNKNOWN_ERROR': 'Something has gone wrong. Try again later',
	'NOT_FOUND': `Can't find such endpoint from this server`
};

const errorStatus = {
	'BAD_REQUEST': 400,
	'AUTHORIZATION_FAILED': 401,
	'NOT_FOUND': 404,
	CONFLICT: 409,
	'UNKNOWN_ERROR': 500
};

const getErrorStatus = err => {
	return errorStatus[err.name] || 500;
};
const getErrorMessage = err => {
	return errorMessages[err.name] || 'Something has gone wrong. Try again later';
};

module.exports = { getErrorStatus, getErrorMessage };
