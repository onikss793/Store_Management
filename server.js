require('dotenv').config();
const http = require('http');
const { App } = require('./app');
const PORT = process.env.PORT || 8000;
const application = new App();

http.createServer(application.getApp()).listen(PORT, () => {
		(async function () {
			await application.database.connect(true);
		})();
		console.log('Server Listening to PORT: ', PORT);
	}
);
