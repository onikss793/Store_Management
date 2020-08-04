const StoreManagement = require('./StoreManagement');

module.exports = {
	Query: {
		StoreManagement: () => StoreManagement
	},
	StoreManagement,
	Mutation: {}
};