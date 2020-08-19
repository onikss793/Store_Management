const responseForList = (data) => {
	if (!data) {
		return [];
	}
	return data.map(({ id, brand_name }) => {
		return {
			id,
			brand_name
		};
	});
};

module.exports = { responseForList };
