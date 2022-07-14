const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Content = sequelize.define('position', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT('long'),
        },
        implication:{
            type: DataTypes.TEXT('long'),
        },
        probability:{
            type: DataTypes.STRING,
        },
        impact:{
            type: DataTypes.STRING,
        },
        maturity: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        xpos: {
            type: DataTypes.FLOAT,
        },
        ypos: {
            type: DataTypes.FLOAT,
        }},
        {
            tableName: 'Content',
        }
    );
    return Content;
};