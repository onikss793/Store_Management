const makeError = require('utils/makeError');

const notFound = (req, res, next) => {
  next(makeError(404, `Can't find ${req.originalUrl} from this server`));
};

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || 500;

  err.message === 'Bad Request' && res.status(400).json({ error: err.message });

  (err.message === 'Conflict' || err.message === 'Validation Error') &&
    res.status(409).json({ error: err.message });

  res.status(err.status).json({ error: err.message });
};

module.exports = { notFound, globalErrorHandler };
