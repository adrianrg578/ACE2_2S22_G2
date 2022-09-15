var express = require('express')
var coon = require('../DB/db')

const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const mySerial = new SerialPort({path:'COM4',baudRate: 9600});
const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\n' }))

let datosAlmc = {};
let userIdOnline;
let edadOnline;
let pesoOnline;
let generoOnline;
let estaturaOnline;

mySerial.on('open', function(){
    mySerial.write('s');
    console.log('Puerto serial abierto');
});

parser.on('data', function (data){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    let dateNow = hoy.toLocaleDateString('en-us', { dateStyle: 'short', timeStyle: 'short' })

    let dic = {}

    let temp = data.toString();
    const datos = temp.split(",");

    if (datos.length > 1) 
    {
        if (datos[0] == "1") {
            console.log(userIdOnline, " - " ,pesoOnline, " <- mis datos")
            dic = {"velocidad":datos[0], "fuerza": datos[1], "ritmo":datos[2],
            "tiempo": 141, "fecha": dateNow} 
            /*var query = coon.query(
                `INSERT INTO datos (velocidad, Fuerza, ritmo) VALUES ("${dic.velocidad}","${dic.fuerza}","${dic.ritmo}");`,
                function(err){
                    if (err) throw err
                }
            )*/
            //console.log(dic)
        }
    }
});

var app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/users", function(req, res){
    var query = coon.query(
        "SELECT * FROM Usuario;",
        function(err, result){
            if (err) throw err
            else res.send(result)
        }
    )
})

app.post("/register", function(req, res){
    
    console.log(req.body)
    var query = coon.query(
        `INSERT INTO Usuario (IdUser, Contra, Nombre, Edad, peso, Genero, Estatura) VALUES ("${req.body.IdUser}","${req.body.Contra}","${req.body.Nombre}", ${req.body.Edad}, ${req.body.peso},"${req.body.Genero}",${req.body.Estatura});`,
        function(err, result){
            if (err) throw err
            else{
                res.send(result)
            } 
        }
    )
})

app.post("/Inicio_sesion", function(req, res){
    var query = coon.query(
        `SELECT Nombre, Edad, peso, Genero, Estatura FROM Usuario WHERE IdUser = '${req.body.textUsuario}' AND Contra = '${req.body.textPass}';`,
        function(err, result){
            if (err){
                throw err
            }
            else{
                res.send(result)
                datosAlmc = result
                if (result.length == 0) 
                {
                    console.log("Usuario o Contraseña Invalidos")
                }else{
                    userIdOnline = datosAlmc[0].Nombre
                    edadOnline = datosAlmc[0].Edad
                    pesoOnline = datosAlmc[0].peso
                    generoOnline = datosAlmc[0].Genero
                    estaturaOnline = datosAlmc[0].Estatura
                }
            } 
        }
    )
})


app.listen(
    5000,
    ()=> console.log('Server Port: ', 5000)
)