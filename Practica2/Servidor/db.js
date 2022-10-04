var mysql = require('mysql')
var coon = mysql.createConnection(
    {
        host: '104.198.193.190',
        user: 'root',
        password: '1234',
        database: 'barras_paralelas',
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