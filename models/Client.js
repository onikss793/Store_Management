module.exports = (DataTypes, db) => {
	db.define('clients', {
		client_name: { type: DataTypes.STRING, allowNull: false },
		phone_number: { type: DataTypes.STRING(20) },
		info: { type: DataTypes.STRING(20) }
	}, { paranoid: true, underscored: true })
}