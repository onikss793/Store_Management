async function middlewares({
	pre = [],
	runner
}) {
	return async request => {
		for await (const func of pre) {
			const err = await func(request);
			if (err) {
				return err;
			}
		}

		return runner(request);
	};
}

module.exports = middlewares;
