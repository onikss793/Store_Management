const db = require('../database');

module.exports = () => {
	if (process.env.NODE_ENV === 'lambda') {
		return db.sync({ force: true }).then(async () => await require('./setupData').storeData());
	}
};