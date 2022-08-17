const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Explpicture = sequelize.define('explpicture', {
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
        trendID: {
            type: DataTypes.INTEGER,
        }
    });
    return Explpicture;
};