var mysql = require('mysql')
var coon = mysql.createConnection(
    {
        host: '34.133.119.185',
        user: 'root',
        password: '1234',
        database: 'puchingbag',
        port: '3306'
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