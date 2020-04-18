require('dotenv').config();
const http = require('http');
const app = require('app');
// const Database = require('database');
const PORT = process.env.PORT || 8000;

// const db = new Database(process.env.NODE_ENV);
const db = require('database');

db.authenticate()
    .then(() => console.log('DB Connected to: ', db.config.database))
    .catch(err => console.error('DB Connection Error:', err));
db.sync();

http.createServer(app).listen(PORT, () =>
    console.log('Server Listening to PORT: ', PORT)
);
