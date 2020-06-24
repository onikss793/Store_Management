const selectStoreList = () => `
	SELECT
	    STORE.id AS id,
		STORE.store_name AS store_name,
		STORE.brand_id AS brand_id,
		STORE.is_admin AS is_admin,
		BRAND.brand_name AS brand_name
	FROM
	    stores AS STORE
	LEFT JOIN brands AS BRAND ON STORE.brand_id = BRAND.id
	WHERE
		STORE.deleted_at IS NULL
	ORDER BY STORE.brand_id`;

module.exports = { selectStoreList };
