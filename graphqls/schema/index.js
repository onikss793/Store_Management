const query = require('./query.gql');
const StoreManagement = require('./StoreManagement/index.gql');

module.exports = {
	default: [query, StoreManagement]
};