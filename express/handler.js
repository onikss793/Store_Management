'use strict';
const awsServerlessExpress = require('aws-serverless-express');
const { App } = require('./app');
const app = new App().getApp();
const server = awsServerlessExpress.createServer(app);

module.exports.index = (event, context) => {
	awsServerlessExpress.proxy(server, event, context);
};
