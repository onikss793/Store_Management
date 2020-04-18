module.exports = (DataTypes, db) => {
	return db.define('vacations', {
		employee_id: { type: DataTypes.INTEGER, allowNull: false },
		start_at: { type: DataTypes.DATE, allowNull: false },
		finish_at: { type: DataTypes.DATE, allowNull: false }
	})
}