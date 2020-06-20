const convertRawToReservationList = (data) => {
	return data.map(r => {
		const {
			id,
			employee_id,
			client_id,
			service_id,
			start_at,
			finish_at,
			status,
			memo,
			employee_name,
			client_name,
			phone_number,
			info,
			service_name,
			color
		} = r;
		return {
			id,
			employee: {
				id: employee_id,
				employee_name
			},
			client: {
				id: client_id,
				client_name,
				phone_number,
				info
			},
			service: {
				id: service_id,
				service_name,
				color
			},
			start_at,
			finish_at,
			memo,
			status
		};
	});
};

module.exports = { convertRawToReservationList };
