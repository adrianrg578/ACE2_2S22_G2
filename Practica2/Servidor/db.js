var mysql = require('mysql')
var coon = mysql.createConnection(
    {
        host: '35.232.210.160',
        user: 'root',
        password: '1234',
        database: 'jump_box',
        port: '3306'
    }
)

coon.connect(function(err){
    if(err){
        throw err
    }else{
        console.log("Conexion con la base de datos lista!!!!!");
    }
})

module.exports = coon;