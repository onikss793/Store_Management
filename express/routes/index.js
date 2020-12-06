const accountRouter = require('./account');
const brandRouter = require('./brand');
const clientRouter = require('./client');
const employeeRouter = require('./employee');
const reservationRouter = require('./reservation');
const serviceRouter = require('./service');
const storeRouter = require('./store');
const setupRouter = require('./setup');
const { globalErrorHandler, notFound } = require('../middlewares/errors');

const _forTest = app => {
	app.get('/authTest', require('../middlewares/auth'), require('./authTest'));
};
const ping = app => {
	app.use('/ping', setupRouter);
};
const errorHandler = app => {
	app.use(notFound);
	app.use(globalErrorHandler);
};
const exec = app => routerModule => {
	const { url, preMiddleware, runner } = routerModule;
	app.use(url, ...preMiddleware, runner);
};

module.exports = app => {
	const router = exec(app);
	_forTest(app);
	ping(app);

	router(accountRouter);
	router(brandRouter);
	router(clientRouter);
	router(employeeRouter);
	router(reservationRouter);
	router(serviceRouter);
	router(storeRouter);

	errorHandler(app);
};
