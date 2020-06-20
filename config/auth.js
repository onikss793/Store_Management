const cryptonite = require('../utils/cryptonite');

module.exports = {
	SUPERUSER: {
		dev: {
			store_name: 'test',
			brand_id: 1,
			is_admin: true,
			password: cryptonite('password')
		},
		prod: {
			store_name: '',
			brand_id: 1,
			is_admin: true,
			password: cryptonite('')
		}
	}
}
