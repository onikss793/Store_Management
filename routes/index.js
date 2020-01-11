const { globalErrorHandler, notFound } = require('middlewares/errors');

const superuserRouter = require('./superuser');

const routes = app => {
  app.use('/ping', (req, res) => res.send('pong'));
  app.use('/superuser', superuserRouter);

  app.use(notFound);
  app.use(globalErrorHandler);
};

module.exports = routes;
