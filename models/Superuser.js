module.exports = (Sequelize, db) =>
  db.define(
    'superusers',
    {
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false }
    },
    { paranoid: true, underscored: true }
  );
