module.exports = (DataTypes, sequelize) => {
	return sequelize.define('brands', {
		brand_name: {
			type: DataTypes.STRING(20),
			unique: true,
			allowNull: false
		}
	}, { paranoid: true, underscored: true });
};
