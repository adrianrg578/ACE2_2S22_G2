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

    let dic1 = {}
    let dic2 = {}
    let dic3 = {}

    let temp = data.toString();
    const datos = temp.split(",");

    if (datos.length > 1) 
    {
        if (datos[0] == "1") {
            if (userIdOnline != undefined) 
            {
                dic1 = {"fuerza": datos[1], "contador_golpes":datos[2], "fecha": dateNow} 
                var query = coon.query(
                    `INSERT INTO datos (IdUsuario, Fuerza, no_golpes, fecha) VALUES ("${userIdOnline}", "${dic1.fuerza}","${dic1.contador_golpes}","${dic1.fecha}");`,
                    function(err){
                        if (err) throw err
                    }
                )
            }
            
        }else if (datos[0] == "2") 
        {
            if (userIdOnline != undefined) 
            {
                dic2 = {"velocidad": datos[1], "contador_golpes":datos[2], "fecha": dateNow} 
                var query = coon.query(
                    `INSERT INTO datos (IdUsuario, velocidad, no_golpes, fecha) VALUES ("${userIdOnline}", "${dic2.velocidad}","${dic2.contador_golpes}","${dic2.fecha}");`,
                    function(err){
                        if (err) throw err
                    }
                )
            }
        }else if (datos[0] == "3") 
        {
            if (userIdOnline != undefined) 
            {
                dic3 = {"ritmo": datos[1], "contador_golpes":datos[2], "fecha": dateNow} 
                var query = coon.query(
                    `INSERT INTO datos (IdUsuario, ritmo, no_golpes, fecha) VALUES ("${userIdOnline}", "${dic3.ritmo}","${dic3.contador_golpes}","${dic3.fecha}");`,
                    function(err){
                        if (err) throw err
                    }
                )
            }
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
    var query = coon.query(
        `INSERT INTO Usuario (IdUser, Contra, Nombre, Edad, peso, Genero, Estatura) VALUES ("${req.body.IdUser}","${req.body.Contra}","${req.body.Nombre}", ${req.body.Edad}, ${req.body.peso},"${req.body.Genero}",${req.body.Estatura});`,
        function(err, result){
            if (err) throw err
            else{
                res.send(result)
                //mensajes para el front o consola del explorador
                console.log("Usuario: ", req.body.IdUser, " Registrado Correctamente")
            } 
        }
    )
})

app.post("/Inicio_sesion", function(req, res){
    var query = coon.query(
        `SELECT Nombre, Edad, peso, Genero, Estatura FROM Usuario WHERE ((IdUser = '${req.body.textUsuario}') AND (Contra = '${req.body.textPass}'));`,
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
                    //para usarlos como globaales adelante 
                    userIdOnline = req.body.textUsuario
                    nameIdOnline = datosAlmc[0].Nombre
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