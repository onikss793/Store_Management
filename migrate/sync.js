module.exports = async database => {
	await database.force();

	return true;
};
