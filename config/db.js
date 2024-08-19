const mysql = require("mysql");

const dbPool = mysql.createPool({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

module.exports = dbPool;
