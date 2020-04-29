const getResponseForList = (data) => {
	return data.map(({ id, client_name, phone_number, info }) => {
		return {
			id,
			client_name,
			phone_number,
			info
		};
	});
};

module.exports = { getResponseForList };