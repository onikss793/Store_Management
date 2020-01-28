module.exports = (Sequelize, db) =>
  db.define(
    'brands',
    {
      name: { type: Sequelize.STRING, unique: true, allowNull: false }
    },
    { paranoid: true, underscored: true }
  );
