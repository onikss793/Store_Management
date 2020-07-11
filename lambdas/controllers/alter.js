const { createDatabase } = require('../database');

module.exports = {
	get: async (request) => {
		const database = createDatabase();
		await database.alter();

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true })
		};
	}
};