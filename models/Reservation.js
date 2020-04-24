module.exports = (DataTypes, db) => {
	return db.define('reservations', {
			employee_id: { type: DataTypes.INTEGER, allowNull: false },
			client_id: { type: DataTypes.INTEGER, allowNull: false },
			store_id: { type: DataTypes.INTEGER, allowNull: false },
			service_id: { type: DataTypes.INTEGER, allowNull: false },
			start_at: { type: DataTypes.DATE, allowNull: false },
			finish_at: { type: DataTypes.DATE, allowNull: false },
			status: {
				type: DataTypes.ENUM,
				values: ['ready', 'done', 'canceled'],
				defaultValue: 'ready'
			},
			memo: { type: DataTypes.STRING(50) }
		}, { paranoid: true, underscored: true }
	);
};