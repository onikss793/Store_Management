module.exports = (Sequelize, db) =>
  db.define(
    'services',
    {
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      color_id: { type: Sequelize.INTEGER, allowNull: false }
    },
    { underscored: true }
  );
