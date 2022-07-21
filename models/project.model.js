const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Project = sequelize.define('project', {
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
            user:{
                type: DataTypes.JSON,
            }
    }
    );
    return Project;
};