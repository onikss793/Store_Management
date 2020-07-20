const copyResolver = (target, source) => {
	for (const o in source) {
		if (o === 'Query' || o === 'Mutation') {
			copyResolver(target[o], source[o]);
		} else {
			target[o] = source[o];
		}
	}
	return target;
};

module.exports = [{ name: 'StoreManagement' }].reduce((p, product) => {
	return copyResolver(p, require(`./${product.name}`));
}, { Query: {}, Mutation: {} });
