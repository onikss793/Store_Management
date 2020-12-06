const { getErrorMessage, getErrorStatus } = require('./CustomError');

const notFound = (_req, _res, next) => {
	try {
		throw new Error('NOT_FOUND');
	} catch (e) {
		next(e);
	}
};

const globalErrorHandler = (err, req, res, _next) => {
	err.name = err.message;
	err.status = getErrorStatus(err);
	err.message = getErrorMessage(err);

	console.error(err);

	if (process.env.NODE_ENV === 'test') {
		res.status(err.status).json();
	} else {
		res.status(err.status).json(formError(err));
	}
};

module.exports = { notFound, globalErrorHandler };

const formError = err => {
	return {
		name: err.name,
		message: err.message
	};
};