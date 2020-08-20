const axios = require('axios');

class Notification {
	constructor(storeData) {
		const { id, start_at, finish_at, employee_name } = storeData;

		this.url = 'http://localhost:3000/notification';
		this.store = {
			id,
			start_at,
			finish_at,
			employee_name
		};
	}

	sendNotification() {
		axios({
			url: this.url,
			method: 'POST',
			data: this.store
		})
			.then(() => console.log('Notification Success!', this.store))
			.catch(() => console.log('Notification Failed', this.store));
	}
}

module.exports = Notification;

// interface StoreData {
// 	id: number;
// 	start_at: Date;
// 	finish_at: Date;
// 	employee_name: string;
// }
