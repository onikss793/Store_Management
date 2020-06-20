module.exports = (DataTypes, db) =>
	db.define('stores', {
			store_name: {
				type: DataTypes.STRING(30),
				allowNull: false,
				unique: true
			},
			password: { type: DataTypes.STRING(255), allowNull: false },
			brand_id: { type: DataTypes.INTEGER, allowNull: false },
			is_admin: { type: DataTypes.BOOLEAN, default: false }
		}, { paranoid: true, underscored: true }
	);
