const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Rppicture = sequelize.define('rppicture', {
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
    return Rppicture;
};