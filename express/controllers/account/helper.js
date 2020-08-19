const JWT_SECRET = process.env.SECRET_KEY || 'test';
const jwt = require('jsonwebtoken');
const cryptonite = require('../../utils').cryptonite;

const compareCrypto = (given, original) => {
	const hashed = cryptonite(given);

	return hashed === original;
};

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
	};
};

module.exports = { signJwt, dataExist, renderStoreData, compareCrypto };
