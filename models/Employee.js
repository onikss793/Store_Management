module.exports = (DataTypes, db) =>
  db.define(
    'employees',
    {
      employee_name: { type: DataTypes.STRING, unique: true, allowNull: false },
      enrolled_in: { type: DataTypes.STRING, allowNull: false },
      store_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    { paranoid: true, underscored: true }
  );
