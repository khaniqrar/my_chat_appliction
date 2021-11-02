const mysql = require('mysql');

const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_system'
});

module.exports = dbConnection;