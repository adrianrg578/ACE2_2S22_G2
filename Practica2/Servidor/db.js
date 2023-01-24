var mysql = require('mysql')
var coon = mysql.createConnection(
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
        throw err
    }else{
        console.log("Conexion con la base de datos lista!!!!!");
    }
})

module.exports = coon;