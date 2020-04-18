module.exports = (DataTypes, db) =>
	db.define(
		'reservations',
		{
			employee_id: { type: DataTypes.INTEGER, allowNull: false },
			client: { type: DataTypes.STRING, allowNull: false },
			store_id: { type: DataTypes.INTEGER, allowNull: false },
			service_id: { type: DataTypes.INTEGER, allowNull: false },
			start_at: { type: DataTypes.DATE, allowNull: false },
			finish_at: { type: DataTypes.DATE, allowNull: false },
			status: {
				type: DataTypes.ENUM,
				values: ['ready', 'done', 'canceled'],
				default: 'ready'
			}
		},
		{ paranoid: true, underscored: true }
	);
