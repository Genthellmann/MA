const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Attribute = sequelize.define('attribute', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trendID: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
    });
    return Attribute;
};