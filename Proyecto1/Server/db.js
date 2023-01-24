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
    if(err) {
        throw err
    }else{ 
        console.log("Conection whit Mysql ready")
    }
})

module.exports = coon;