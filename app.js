const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan')('dev');
const routes = require('./routes');

const forTest = () => {
	app.use(cors());
	app.use(logger);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	routes(app);

	return app;
}

class App {
	constructor() {
		this.app = express();
		this.setup();
		this.router();
	}

	getApp() {
		return this.app;
	}

	setup() {
		this.app.use(cors());
		this.app.use(logger);
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	router() {
		this.router = routes(this.app);
	}
}

module.exports = { forTest, App };
