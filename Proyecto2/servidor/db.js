var mysql = require('mysql')
var coon =  mysql.createConnection(
 // ingresar los datos proporcionados para el funcionamiento de la base
 {  /*
 host: '',
 user: '',
 password: '',
 database: '',
 port: ''
 */
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