module.exports = (DataTypes, db) => {
	return db.define(
		'brands',
		{
			brand_name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			}
		},
		{ paranoid: true, underscored: true }
	);
};
