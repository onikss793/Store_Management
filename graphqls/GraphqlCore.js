const { ApolloServer } = require('apollo-server-lambda');
const utils = require('../lambdas/utils');
const Base = require('./Base');

module.exports = {
	init: (configs, extendedBase = null) => {
		return new GraphqlCore(configs, extendedBase);
	},
	Base
}

class GraphqlCore {
	constructor(configs, ExtendedBase = null) {
		this._configs = configs;
		if (ExtendedBase) {
			this._base = new ExtendedBase(configs);
		} else {
			this._base = new Base(configs);
		}
		this.index = async (evt, ctx) => {
			if (evt.httpMethod === 'OPTIONS') {
				return await this.gqlOptFunction(evt, ctx);
			} else {
				return await this.gqlFunction(evt, ctx);
			}
		}
	}

	preProcess() {
		this._base.createPool();
	}

	async gqlFunction(evt, ctx) {
		ctx.callbackWaitsForEmptyEventLoop = false;

		if (!utils.slsHeaders(evt)) return { body: '' };

		const context = {
			...this._base.context()
		};

		let requestInfo;
		const server = new ApolloServer({
			typeDefs: this._base.schema(),
			resolvers: this._base.resolver(),
			context: req => {
				requestInfo = req;
				return {
					req,
					...context,
					dataloader: this._base.dataloader(context)
				};
			},
			formatError: error => {
				try {
					error.requestInfo = requestInfo;
					const errorObjects = this._base.errorObjects();
					const errorResult = errorObjects.create(error);
					console.error(JSON.stringify(errorResult));
					return errorResult;
				} catch (err) {
					console.error(JSON.stringify(err));
					return err;
				}
			},
			playground: {
				settings: {
					'editor.theme': 'dark',
				}
			}
		});

		server.playgroundVersion = 'latest';
		const handler = server.createHandler();
		const runHandler = (evt, ctx, handler) => {
			return new Promise(res => {
				handler(evt, ctx, (err, out) => {
					res({ err, out });
				});
			});
		};

		let before;
		let after;
		if (this._configs.gqlMiddlewares) {
			({ before, after } = this._configs.gqlMiddlewares);
		}
		if (before) before(evt, ctx, handler);
		const res = await runHandler(evt, ctx, handler);
		const { out } = await this._base.cbFilter({ evt, ...res });
		if (after) after(evt, ctx, handler, out);
		return {
			...res,
			headers: {
				...res.headers,
				...this._base.corsHeaders({ origin: evt.headers.origin })
			}
		};
	}

	async gqlOptFunction(evt, ctx) {
		ctx.callbackWaitsForEmptyEventLoop = false;

		utils.slsHeaders(evt);
		return {
			statusCode: 200,
			headers: this._base.corsHeaders({ origin: evt.headers.origin })
		};
	}
}