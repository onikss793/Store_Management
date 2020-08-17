const sync = require('./sync');
const setSeedData = require('./seedData');
const { createDatabase } = require('../lambdas/database');
const dotenv = require('dotenv');

function sleep(second) {
	return new Promise(res => setTimeout(res, second * 1000));
}

async function migrate(retryCount) {
	try {
		dotenv.config();

		console.log('[[ MIGRATE ]]: Waiting for DB Connection...');
		await sleep(1 * retryCount);

		const database = createDatabase();
		const syncResult = await sync(database);
		const seedResult = await setSeedData(database);
		
		if (syncResult && seedResult) {
			return true;
		}
	} catch (e) {
		if (retryCount > 1) {
			await migrate(retryCount - 1);
		} else if (retryCount === 1) {
			console.log('[[ MIGRATE ]]: Failed. Try Again Later');
			process.exit(1);
		}
	}
}

(async function () {
	await migrate(4);
}());
