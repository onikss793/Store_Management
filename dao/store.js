const selectStoreList = () => `
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
	ORDER BY s.brand_id`;

module.exports = { selectStoreList };
