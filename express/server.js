require('dotenv').config();
const http = require('http');
const { App } = require('./app');
const { database } = require('./database');
const PORT = process.env.PORT || 3000;
const application = new App();

http.createServer(application.getApp()).listen(PORT, () => {
		(async function () {
			await database.connect(true);
		})();
		console.log('Server Listening to PORT: ', PORT);
	}
);
