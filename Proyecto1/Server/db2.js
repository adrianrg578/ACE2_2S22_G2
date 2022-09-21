const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    host: '34.133.119.185',
    user: 'root',
    password: '1234',
    database: 'puchingbag',
    port: '3306'
});
