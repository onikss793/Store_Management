const db = require('database');

module.exports = async () => {
	try {
		await db.authenticate()
		        .then(() =>
			        console.log('TEST_DB Connected to: ', db.config.database)
		        )
		        .catch(err => console.error('TEST_DB Connection Error:', err));
		await db.sync({ force: true });
	} catch (err) {
		console.log('Setup Error: ', err);
	}
};
