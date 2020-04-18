const accountRouter = require('./account');
const { globalErrorHandler, notFound } = require('middlewares/errors');

const routes = app => {
    app.use('/ping', (req, res) => res.send('pong'));
    app.use('/account', accountRouter);

    app.use(notFound);
    app.use(globalErrorHandler);
};

module.exports = routes;
