const sync = require('./sync');
const setMaster = require('./setMaster');
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
		await setMaster(database);
		return true;
	} catch (e) {
		if (retryCount > 1) {
			await migrate(retryCount - 1);
		}
		console.error('MIGRATE ERROR: ', e);
		return false;
	}
}

(async function () {
	await sleep(10);

	await migrate();
	return true;
})();