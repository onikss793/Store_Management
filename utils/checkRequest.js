module.exports = (request, properties = []) => {
	const body = request.body;

	for (const prop of properties) {
		if (!body[prop] || !body[prop].length) {
			return false;
		}
	}

	return true;
}