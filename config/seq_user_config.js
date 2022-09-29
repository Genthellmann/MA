

//=========================
//change when switching host
//=========================

const seq_user_config = {
    db_img: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'userDB',
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
};
module.exports = seq_user_config;

//
// const seq_user_config = {
//     db_img: {
//         host: '127.0.0.1',
//         user: 'thellmann',
//         password: 'Trendux2022JT!',
//         database: 'userDB',
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
//
// module.exports = seq_user_config;