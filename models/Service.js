module.exports = (DataTypes, sequelize) => {
	return sequelize.define('services', {
		service_name: {
			type: DataTypes.STRING(10),
			unique: true,
			allowNull: false
		},
		color: {
			type: DataTypes.STRING(30)
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
		}
	}, { paranoid: true, underscored: true, timestamps: true });
};
