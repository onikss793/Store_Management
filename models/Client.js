module.exports = (DataTypes, db) => {
	return db.define('clients', {
		client_name: { type: DataTypes.STRING(20), allowNull: false },
		phone_number: { type: DataTypes.STRING(20), unique: true },
		info: { type: DataTypes.STRING(30) },
		store_id: { type: DataTypes.INTEGER, allowNull: false }
	}, { paranoid: true, underscored: true })
}