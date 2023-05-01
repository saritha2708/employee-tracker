const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host:'localhost',
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE
}).promise();

module.exports = db;