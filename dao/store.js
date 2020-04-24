const { Store } = require('../models'),
	{ QueryTypes } = require('sequelize'),
	Sequelize = require('../database');

const selectStore = (index) => {
	return Store.findOne({ where: { ...index } });
};

const insertStore = (data) => {
	return Store.create(data);
};

const selectStoreList = () => {
	return Sequelize.query(`
		SELECT
		    s.id AS id,
			s.store_name AS store_name,
			s.brand_id AS brand_id,
			s.is_admin AS is_admin,
			b.brand_name AS brand_name
		FROM
		    stores AS s
		LEFT JOIN brands AS b ON s.brand_id = b.id
		WHERE
			s.deleted_at IS NULL
		ORDER BY s.brand_id
	`, {
		types: QueryTypes.SELECT,
		model: Store
	});
};

module.exports = { selectStore, insertStore, selectStoreList };