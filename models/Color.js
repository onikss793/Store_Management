module.exports = (DataTypes, db) =>
    db.define(
        'colors',
        {
            value: { type: DataTypes.STRING, unique: true, allowNull: false }
        },
        { underscored: true }
    );
