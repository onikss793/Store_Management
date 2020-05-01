const accountRouter = require('./account'),
	storeRouter = require('./store'),
	employeeRouter = require('./employee'),
	clientRouter = require('./client'),
	serviceRouter = require('./service'),
	reservationRouter = require('./reservation'),
	brandRouter = require('./brand'),
	{ globalErrorHandler, notFound } = require('middlewares/errors');

const exec = (app) => (routerModule) => {
	const { url, router, preMiddleware } = routerModule;
	app.use(url, ...preMiddleware, router);
};

const routes = app => {
	const router = exec(app);
	app.use('/ping', (req, res) => res.send('pong'));
	app.use('/account', accountRouter);
	app.get('/authTest', require('../middlewares/auth'), (req, res) => {
		const { superuser, is_admin, store_id } = req;
		res.status(200).json({ superuser, is_admin, store_id });
	});

	router(storeRouter);
	router(employeeRouter);
	router(clientRouter);
	router(serviceRouter);
	router(reservationRouter);
	router(brandRouter);

	app.use(notFound);
	app.use(globalErrorHandler);
};

module.exports = routes;
