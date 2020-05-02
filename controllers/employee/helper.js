const renderResponseForList = (data) => {
	if (!data.length) {
		return [];
	}
	return data.map(({ id, employee_name, enrolled_in, vacation }) => {
		return {
			id,
			employee_name,
			enrolled_in,
			vacation
		};
	});
};

module.exports = { renderResponseForList };