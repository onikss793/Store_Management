module.exports = (request, properties = []) => {
	const body = request.body;

	for (const prop of properties) {
		const key = body[prop];

		if (typeof key === 'string') {
			if (!key || !key.length) {
				return false;
			}
		}

		if (typeof key === 'number') {
			if (key < 0) {
				return false;
			}
		}

		if (typeof key === 'undefined') {
			return false;
		}

		if (key === null) {
			return false;
		}
	}

	return true;
}