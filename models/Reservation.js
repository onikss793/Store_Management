module.exports = (Sequelize, db) =>
  db.define(
    'reservations',
    {
      employee_id: { type: Sequelize.INTEGER, allowNull: false },
      store_id: { type: Sequelize.INTEGER, allowNull: false },
      service_id: { type: Sequelize.INTEGER, allowNull: false },
      start_at: { type: Sequelize.DATE, allowNull: false },
      finish_at: { type: Sequelize.DATE, allowNull: false },
      status: {
        type: Sequelize.ENUM,
        values: ['ready', 'done', 'canceled'],
        default: 'ready'
      }
    },
    { paranoid: true, underscored: true }
  );
