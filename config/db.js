const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
//console.log(process.env)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,  
});
module.exports = pool.promise();