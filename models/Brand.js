module.exports = (DataTypes, sequelize) => {
	return sequelize.define('brands', {
		brand_name: {
			type: DataTypes.STRING(20),
			unique: true,
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
