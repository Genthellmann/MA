const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const StratPos = sequelize.define('stratpos2', {
        trendID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        content: {
            type: DataTypes.STRING,
        }
    });
    return StratPos;
};