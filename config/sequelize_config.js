const sequelize_config = {
    db_img: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'trendsDB',
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
};

module.exports = sequelize_config;