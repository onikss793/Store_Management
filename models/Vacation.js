module.exports = (DataTypes, sequelize) => {
	return sequelize.define('vacations', {
		employee_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finish_at: {
			type: DataTypes.DATE,
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
		indexes: [{ unique: false, fields: ['employee_id'], name: 'vacation_employee_id_index' }],
		paranoid: true,
		underscored: true,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at'
	});
};
