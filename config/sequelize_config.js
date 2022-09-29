//=========================
//change when switching host
//=========================


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



// const sequelize_config = {
//     db_img: {
//         host: '127.0.0.1',
//         user: 'thellmann',
//         password: 'Trendux2022JT!',
//         database: 'trendsDB',
//         dialect: "mysql",
//         socketPath: '/var/run/mysqld/mysqld.sock',
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     },
// };
// module.exports = sequelize_config;