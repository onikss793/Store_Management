module.exports = (DataTypes, db) =>
	db.define(
		'reservations',
		{
			employee_id: { type: DataTypes.INTEGER, allowNull: false },
			client: { type: DataTypes.STRING, allowNull: false },
			service: { type: DataTypes.INTEGER, allowNull: false },
			store_id: { type: DataTypes.INTEGER, allowNull: false },
			service_id: { type: DataTypes.INTEGER, allowNull: false },
			start_at: { type: 'TIMESTAMP', allowNull: false },
			finish_at: { type: 'TIMESTAMP', allowNull: false },
			status: {
				type: DataTypes.ENUM,
				values: ['ready', 'done', 'canceled'],
				defaultValue: 'ready'
			}
		},
		{ paranoid: true, underscored: true }
	);
