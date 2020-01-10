const Database = require('database');
const db = new Database(process.env.NODE_ENV);

module.exports = () => {
    db.authenticate()
        .then(() => console.log('TEST_DB Connected!'))
        .catch(err => console.error('TEST_DB Connection Error:', err));
    db.sync();

    beforeEach(() => {
        db.sync({ force: true });
    });

    afterEach(() => {
        db.sync({ force: true });
    });
};
