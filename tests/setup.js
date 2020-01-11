const db = require('database');

module.exports = () => {
  db.authenticate()
    .then(() => console.log('TEST_DB Connected!'))
    .catch(err => console.error('TEST_DB Connection Error:', err));
  db.sync();

  beforeEach(() => {
    console.log('NODE_ENV: ', process.env.NODE_ENV);
  });

  afterEach(() => {
    db.sync({ force: true });
  });
};
