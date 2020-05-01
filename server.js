require('dotenv').config();
const http = require('http');
const app = require('app');
const PORT = process.env.PORT || 8000;
const db = require('database');

db.authenticate()
  .then(() => console.log('DB Connected to: ', db.config.database))
  .catch(err => console.error('DB Connection Error:', err));
db.sync({ alter: true });

http.createServer(app).listen(PORT, () =>
	console.log('Server Listening to PORT: ', PORT)
);
