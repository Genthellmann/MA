const dbConfig = require("../config/img_config");
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
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.images = require("./image.model.js")(sequelize, Sequelize);
module.exports = db;