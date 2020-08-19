const getResponseForList = (data) => {
	return data.map(({ id, service_name, color }) => {
		return {
			id,
			service_name,
			color
		};
	});
};

module.exports = { getResponseForList };
