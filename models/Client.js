module.exports = (DataTypes, sequelize) => {
	return sequelize.define('clients', {
		client_name: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING(20),
			unique: true
		},
		info: {
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
