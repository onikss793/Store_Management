module.exports = (DataTypes, db) => {
	return db.define('employees', {
		employee_name: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		enrolled_in: { type: DataTypes.DATE, allowNull: false },
		store_id: { type: DataTypes.INTEGER, allowNull: false }
	}, { paranoid: true, underscored: true });
}