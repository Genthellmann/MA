const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Vpa = sequelize.define('vpa', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        trendID: {
            type: DataTypes.INTEGER,
        },
        xpos: {
            type: DataTypes.FLOAT,
        },
        ypos: {
            type: DataTypes.FLOAT,
        },
    });
    return Vpa;
};