const db = require('database');

module.exports = () => {
  db.authenticate()
    .then(() => console.log('TEST_DB Connected!'))
    .catch(err => console.error('TEST_DB Connection Error:', err));
  db.sync();

  // beforeEach(() => {});

  afterEach(() => db.sync({ force: true }));
};
