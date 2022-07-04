const {Sequelize, DataTypes} = require('@sequelize/core');

module.exports = (sequelize) => {
    const Image = sequelize.define('image', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        // },
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
    return Image;
};

