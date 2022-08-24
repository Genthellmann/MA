const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Benchmark = sequelize.define('benchmark', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trendID: {
            type: DataTypes.INTEGER,
        },
        ux: {
            type: DataTypes.STRING,
        },
        rse: {
            type: DataTypes.STRING,
        },
    });
    return Benchmark;
};