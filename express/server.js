require('dotenv').config();
const http = require('http');
const { App } = require('./app');
const PORT = process.env.PORT || 3000;
const application = new App().getApp();

http.createServer(application).listen(PORT, () => {
		console.log('Server Listening to PORT: ', PORT);
	}
);
