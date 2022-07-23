const {Sequelize, DataTypes} = require("@sequelize/core");

module.exports=(sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        password:{
            type: Sequelize.STRING
        }},
    {
    }
    );
    return User;
}