const StoreController = require('./store')();
const BrandController = require('./brand')();
const EmployeeController = require('./employee')();
const ReservationController = require('./reservation')();
const VacationController = require('./vacation')();
const AccountController = require('./account')();
const middlewares = require('../middleware');
const ping = require('./ping');
// 아래 두개는 개발 단계에서 임시로...
const force = require('./force');
const alter = require('./alter');

module.exports = {
	alter: {
		GET: alter.get
	},
	force: {
		GET: force.get,
		POST: force.post
	},
	ping: {
		GET: ping.get
	},

	account: {
		POST: async request => (await middlewares({
			pre: [],
			runner: AccountController.post
		}))(request),
	},
	brand: {
		POST: async request => (await middlewares({
			pre: [AccountController.authorize, AccountController.onlyAdmin],
			runner: BrandController.post
		}))(request),
		GET: async request => (await middlewares({
			pre: [AccountController.authorize, AccountController.onlyAdmin],
			runner: BrandController.get
		}))(request),
		DELETE: async request => (await middlewares({
			pre: [AccountController.authorize, AccountController.onlyAdmin],
			runner: BrandController.delete
		}))(request)
	},
	store: {
		POST: async request => (await middlewares({
			pre: [AccountController.authorize, AccountController.onlyAdmin],
			runner: StoreController.post
		}))(request),
		GET: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: StoreController.get
		}))(request),
		DELETE: async request => (await middlewares({
			pre: [AccountController.authorize, AccountController.onlyAdmin],
			runner: StoreController.delete
		}))(request)
	},
	employee: {
		POST: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: EmployeeController.post
		}))(request),
		GET: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: EmployeeController.get
		}))(request),
		DELETE: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: EmployeeController.delete
		}))(request)
	},
	reservation: {
		PUT: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: ReservationController.put
		}))(request),
		POST: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: ReservationController.post
		}))(request),
		GET: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: ReservationController.get
		}))(request)
	},
	vacation: {
		POST: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: VacationController.post
		}))(request),
		GET: async request => (await middlewares({
			pre: [AccountController.authorize],
			runner: VacationController.get
		}))(request)
	}
};
