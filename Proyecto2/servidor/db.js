var mysql = require('mysql')
var coon =  mysql.createConnection(
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
        console.log("fallo la conexion al servidor, revise si la base esta disponible o su ip esta permitida");
        throw err
    }else{
        console.log("Conexion a la base de datos exitosa")
    }
})

module.exports = coon;