const accountRouter = require('./account'),
	storeRouter = require('./store'),
	{ globalErrorHandler, notFound } = require('middlewares/errors');

const exec = (app) => (routerModule) => {
	const { url, router, preMiddleware } = routerModule;
	app.use(url, ...preMiddleware, router);
};

const routes = app => {
	const router = exec(app);
	app.use('/ping', (req, res) => res.send('pong'));
	app.use('/account', accountRouter);

	router(storeRouter);

	app.use(notFound);
	app.use(globalErrorHandler);
};

module.exports = routes;
