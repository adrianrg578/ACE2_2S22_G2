const mysql = require('mysql2/promise');

module.exports = mysql.createConnection(
    {
        host: '104.198.193.190',
        user: 'root',
        password: '1234',
        database: 'barras_paralelas',
        port: '3306'
    }
);
