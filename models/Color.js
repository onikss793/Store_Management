module.exports = (Sequelize, db) =>
    db.define(
        'colors',
        {
            color: { type: Sequelize.STRING, unique: true, allowNull: false }
        },
        { underscored: true }
    );
