module.exports = (DataTypes, sequelize) => {
	return sequelize.define('employees', {
		employee_name: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		enrolled_in: {
			type: DataTypes.DATE,
			allowNull: false
		},
		store_id: {
			type: DataTypes.INTEGER,
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
		},
	}, { paranoid: true, underscored: true, timestamps: true });
}
