require('dotenv').config();
const http = require('http');
const app = require('app');
const db = require('database');

const PORT = process.env.PORT || 8000;

db.authenticate()
  .then(() => console.log('DB Connected!'))
  .catch(err => console.error('DB Connection Error:', err));
db.sync({ force: true });

http
  .createServer(app)
  .listen(PORT, () => console.log('Server Listening to PORT: ', PORT));
