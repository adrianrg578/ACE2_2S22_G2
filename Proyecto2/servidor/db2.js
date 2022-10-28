const mysql = require(mysql2/promise);

module.exports = mysql.createConnection({
    host: '35.232.210.160',
    user: 'root',
    password: '1234',
    database: 'jump_box',
    port: '3306'
});