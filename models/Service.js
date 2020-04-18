module.exports = (DataTypes, db) =>
  db.define(
    'services',
    {
      service_name: { type: DataTypes.STRING(10), unique: true, allowNull: false },
      color_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    { underscored: true }
  );
