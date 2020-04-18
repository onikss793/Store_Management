module.exports = (DataTypes, db) => {
	return db.define('clients', {
		client_name: { type: DataTypes.STRING(20), allowNull: false },
		phone_number: { type: DataTypes.STRING(20) },
		info: { type: DataTypes.STRING(30) }
	}, { paranoid: true, underscored: true })
}