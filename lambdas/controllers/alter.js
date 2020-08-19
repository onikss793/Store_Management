const { createDatabase } = require('../database');

module.exports = {
	get: async () => {
		const database = createDatabase();
		await database.alter();

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true })
		};
	}
};
