module.exports = (DataTypes, sequelize) => {
	return sequelize.define('reservations', {
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		client_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		store_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		service_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		start_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finish_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM,
			values: ['ready', 'done', 'canceled'],
			defaultValue: 'ready'
		},
		memo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		indexes: [{ unique: false, fields: ['employee_id'], name: 'reservation_employee_id_index' }],
		paranoid: true,
		underscored: true,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at'
	});
};
