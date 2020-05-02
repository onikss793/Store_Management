const renderResponseForList = (data) => {
	if (!data.length) {
		return [];
	}
	return data.map(({ id, employee_name, enrolled_in }) => {
		return {
			id,
			employee_name,
			enrolled_in
		};
	});
};

module.exports = { renderResponseForList };