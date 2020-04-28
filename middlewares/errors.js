const makeError = require('../utils/throwError');

const notFound = (req, res, next) => {
  next(makeError(404, `Can't find ${req.originalUrl} from this server`));
};

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || 500;

  err.message === 'Bad Request' && res.status(400).json({ error: err.message });

  (err.message === 'Conflict' || err.message === 'Validation Error') &&
    res.status(409).json({ error: err.message });

  handleTestErrors(err, res);
};

module.exports = { notFound, globalErrorHandler };

const handleTestErrors = ({ status, message }, res) => {
	if (process.env.NODE_ENV === 'test') {
		console.log('ERROR: ', status, ' ',message);
		res.status(status).json();
	} else {
		res.status(status).json({ error: message });
	}
}