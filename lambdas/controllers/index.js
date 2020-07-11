const StoreController = require('./store')();
const BrandController = require('./brand')();
const EmployeeController = require('./employee')();
const ReservationController = require('./reservation')();
const VacationController = require('./vacation')();
const ping = require('./ping');
const force = require('./force');
const alter = require('./alter');

module.exports = {
	ping: {
		GET: ping.get
	},
	force: {
		GET: force.get
	},
	alter: {
		GET: alter.get
	},
	store: {
		POST: StoreController.post,
		GET: StoreController.get
	},
	brand: {
		POST: BrandController.post,
		// GET
	},
	employee: {
		POST: EmployeeController.post,
		GET: EmployeeController.get,
	},
	reservation: {
		POST: ReservationController.post,
		GET: ReservationController.get
	},
	vacation: {
		POST: VacationController.post,
		GET: VacationController.get,
	}
}