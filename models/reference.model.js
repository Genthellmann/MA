const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Reference = sequelize.define('reference', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            trendID: {
                type: DataTypes.INTEGER,
            },
            rproduct:{
                type: DataTypes.TEXT('long'),
            },
            rsystemelements:{
                type: DataTypes.TEXT('long'),
            },
            // usabilityattributes:{
            //     type: DataTypes.TEXT('long'),
            // },
            usabilityattributes:{
                type: DataTypes.JSON,
            },
            prior: {
                type: DataTypes.INTEGER,
            },
        }
    );
    return Reference;
};