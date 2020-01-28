module.exports = (Sequelize, db) =>
  db.define(
    'stores',
    {
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      brand_id: { type: Sequelize.INTEGER, allowNull: false },
      isAdmin: { type: Sequelize.BOOLEAN, default: false }
    },
    { paranoid: true, underscored: true }
  );
