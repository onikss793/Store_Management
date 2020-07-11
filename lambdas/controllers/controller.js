const utils = require('../utils');
const { createDatabase } = require('../database');

class Controller {
	setDatabase() {
		this.database = createDatabase();
	}

	// ONLY FOR DEVELOPMENT!
	async resetDatabase() {
		await this.database.connect(true);
	}

	setService(serviceName, Service) {
		this[serviceName] = new Service(this.database);
	}

	setProperties(properties) {
		this.properties = properties;
	}

	bodyCheck(request) {
		if (!utils.checkRequest(request, this.properties)) {
			const error = new Error();

			error.statusCode = 400;
			error.name = 'Bad Request';
			error.message = `To ${request.method} ${request.route}, body has to contain: ${this.properties.join(', ')}`;

			throw error;
		}
	}
}

module.exports = Controller;