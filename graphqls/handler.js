console.log(require('./resolver'));
const graphqlCore = require('./GraphqlCore');
const graphqlCoreInstance = graphqlCore.init({
	schema: require('./schema').default,
	resolver: require('./resolver'),
	// dataloader: require('./dataloader'),
	// error: {
	// 	objects: require('./err-objects'),
	// 	message: require('./error-messages'),
	// },
	config: {
		allowedDomain: require('../lambdas/utils').allowedDomain
	}
});

graphqlCoreInstance.preProcess();

module.exports = graphqlCoreInstance;