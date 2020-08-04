const utils = require('../lambdas/utils');
const { createDatabase } = require('../lambdas/database');


module.exports = class Base {
	constructor(configs) {
		this.stage = process.env.SM_STAGE;
		this.configs = configs;
	}

	schema() {
		return this.configs.schema;
	}

	resolver() {
		return this.configs.resolver;
	}

	dataloader(context) {
		return this.configs.dataloader();
	}

	context() {
		return {
			database: this.database,
			stage: this.stage,
			...this.configs.config.context,
		};
	};

	errorMessages() {
		return this.configs.error.messages;
	}

	errorObjects() {
		return {
			...this.errorObjects({ errorMessages: this.errorMessages() })
		};
	}

	corsHeaders({ origin }) {
		return utils.corsHeaders(origin);
	}

	createPool() {
		this.database = createDatabase();
	}

	async cbFilter({ evt, err, out, }) {
		try {
			if (evt.httpMethod === 'POST') {
				const bodyObj = JSON.parse(out.body);
				if (bodyObj.errors && bodyObj.errors.length) {
					for (const errObj of bodyObj.errors) {
						let code;
						if (errObj.name === undefined) {
							const err = errObj.message.split('::');
							code = err[0];
						} else {
							code = errObj.statusCode;
						}
						out.statusCode = Number(code);
					}
				}
			}
		} catch (err) {
			console.error(err);
			out.statusCode = 500;
		} finally {
			out.headers = {
				...out.headers,
				...(this.corsHeaders({ origin: evt.headers.origin }))
			}
		}
		return { err, out };
	}
}