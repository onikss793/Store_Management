const responseForList = (data) => {
	return data.map(({ id, brand_name }) => {
		return {
			id,
			brand_name
		};
	});
};

module.exports = { responseForList };