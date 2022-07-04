const dbConfig = require("../config/seq_user_config");
// const Sequelize = require("sequelize");
const { Sequelize } = require('@sequelize/core');


const sequelize = new Sequelize(dbConfig.db_img.database, dbConfig.db_img.user, dbConfig.db_img.password, {
    host: dbConfig.db_img.host,
    dialect: dbConfig.db_img.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.db_img.pool.max,
        min: dbConfig.db_img.pool.min,
        acquire: dbConfig.db_img.pool.acquire,
        idle: dbConfig.db_img.pool.idle,
    },
});
const userdb = {};
userdb.Sequelize = Sequelize;
userdb.sequelize = sequelize;
userdb.user = require("../models/user.model")(sequelize, Sequelize);
//TO DO: if necessary give user different Roles
module.exports = userdb;