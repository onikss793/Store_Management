module.exports = (DataTypes, db) =>
	db.define('colors', {
			value: {
				type: DataTypes.STRING(10),
				unique: true,
				allowNull: false
			}
		}, { underscored: true }
	);
