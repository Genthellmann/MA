const dbConfig = require("../config/sequelize_config");
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
db.content = require("./content.model")(sequelize, Sequelize);
db.project = require("./project.model")(sequelize,Sequelize);
db.reference = require("./reference.model")(sequelize,Sequelize);
db.rppicture = require("./rppicture.model")(sequelize,Sequelize);
db.explpicture = require("./explpicture.model")(sequelize,Sequelize);
db.vpa = require("./vpa.model")(sequelize,Sequelize);
db.benchmark = require("./benchmark.model")(sequelize,Sequelize);
db.stratpos = require("./stratPos.model")(sequelize,Sequelize);

module.exports = db;