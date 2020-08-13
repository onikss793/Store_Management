const sync = require('./sync');
const setSeedData = require('./seedData');
const { createDatabase } = require('../lambdas/database');
const dotenv = require('dotenv');

function sleep(second) {
	return new Promise(res => setTimeout(res, second * 1000));
}

async function migrate(retryCount = 5) {
	try {
		dotenv.config();

		const database = createDatabase();
		await sync(database);
		await setSeedData(database);
		return true;
	} catch (e) {
		if (retryCount > 1) {
			await migrate(retryCount - 1);
		}
		console.error('[[ MIGRATE ]]: ERROR: ', e);
		return false;
	}
}

(async function () {
	await sleep(10);

	await migrate(1);
	return true;
})();