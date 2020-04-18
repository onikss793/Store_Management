const JWT_SECRET = process.env.JWT_SECRET || 'test',
	jwt = require('jsonwebtoken');

const signJwt = (data) => {
	return jwt.sign({ id: data.id }, JWT_SECRET);
};

const dataExist = (data) => {
	return data && data.id && data.store_name.length;
};

const renderStoreData = (data) => {
	return {
		id: data.id,
		store_name: data.store_name,
		brand_id: data.brand_id,
		is_admin: data.is_admin,
	}
}

module.exports = { signJwt, dataExist, renderStoreData };