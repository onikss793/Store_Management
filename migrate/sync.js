module.exports = async (database) => {
	await database.connect();

	return true;
};
