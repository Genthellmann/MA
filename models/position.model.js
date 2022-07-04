const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Position = sequelize.define('position', {
        id: {
            type: DataTypes.INTEGER,
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
        picture:{
            type: DataTypes.BLOB,
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
        position: {
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
            timestamps: false
        }
    );
    return Position;
};