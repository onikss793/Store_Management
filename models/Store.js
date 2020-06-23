module.exports = (DataTypes, sequelize) => {
	return sequelize.define('stores', {
		store_name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		brand_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		is_admin: {
			type: DataTypes.BOOLEAN,
			default: false
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
