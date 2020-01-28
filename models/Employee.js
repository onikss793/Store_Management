module.exports = (Sequelize, db) =>
  db.define(
    'employees',
    {
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      enrolled_in: { type: Sequelize.STRING, allowNull: false },
      store_id: { type: Sequelize.INTEGER, allowNull: false }
    },
    { paranoid: true, underscored: true }
  );
