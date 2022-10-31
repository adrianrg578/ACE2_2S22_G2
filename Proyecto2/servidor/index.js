const express = require('express')
const cors = require("cors")
const db2 = require('./db2')
var coon = require('./db')
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//conexion socket
const { createServer } = require("http");
const { Server } = require("socket.io");

//configuracion de cors con Socket.io
const server = { createServer }.createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        allowedHeader: ["Access-Control-Allow-Origin", "*"],
        credentials: true
    }
});

//datos globales
var datos_del_arduino;
var today =new Date();
let datosAlmc = {};
let userIdOnline = 1;
let start = 0;
let time = 0;
let id_entreno = 1; 


const port = process.env.PORT || 4001;

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

//Puerto que le asigno la PC al BT
const mySerial = new SerialPort({path:'COM6', baudRate:9600});

const parser = mySerial.pipe(new ReadlineParser({delimiter: '\n'}))

parser.on('data', function(data){

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    var year = hoy.toLocaleDateString("default", {year: "numeric"});
    var month = hoy.toLocaleDateString("default",{month: "2-digit"});
    var day = hoy.toLocaleDateString("default", {day: "2-digit"});
    var formattedDate = '"' + year + "-"+month+"-"+day +'"';

    let temp = data.toString();
    const datos = temp.split(",");
    if(datos[1]){
        datos_del_arduino = { Fuerza: datos[0], Peso: datos[1]};
        let impulso;
        impulso = calculo_impulso(datos[1])
        console.log(datos_del_arduino);
        if(datos[1] < 49 && datos[0] < 49){
            console.log("datos muy pequeños, ignorados de la base de datos")
        }else{
            var query = coon.query(
                `INSERT INTO Datos (id_user, fecha, id_Entrenamiento, fuerza_impulso, fuerza_llegada, peso_arduino) VALUES (${userIdOnline}, "2022-10-27",${id_entreno} ,${impulso},${datos[0]},${datos[1]});`,
                function(err){
                    if(err){throw err}
                }    
            )
        }
    }
})

function calculo_impulso(peso_ard,){
    let resultado;

    if (peso_ard>49 && peso_ard<95){
        resultado = peso_ard * 2
    } else{
        resultado = 0;
    }
    return resultado;
}


//enmision de los datos completos
mySerial.on('data',function(data){
    io.emit('datos_de_arduino',datos_del_arduino);
})


//Retorna los usuarios en la base de datos
app.get("/users", function(req, res){
    var query = coon.query(
        "SELECT * FROM Usuario;",
        function(err, result){
            if (err) throw err
            else res.send(result)
        }
    )
})

//registra un nuevo usuario a la base de datos
app.post('/register', function (req, res){
    var query = coon.query(
        `INSERT INTO Usuario (nombre, apellido, username, pass, edad, peso, genero, estatura) VALUES 
       "${req.body.Nombre}", "${req.body.Apellido}", ("${req.body.Username}", "${req.body.Contrasena}", 
        ${parseInt(req.body.Edad)}, ${parseInt(req.body.Peso)}, "${req.body.Genero}", ${req.body.Estatura});`,
        function (err, result){
            if (err){
                throw err
            }else{
                respuesta = "Usuario: ", req.body.Username, "Registrado correctamente"
                res.send(respuesta)
                console.log(respuesta)
            }
        }
    )
})

//Inicio de sesion
app.post("/login", function(req, rest){
    var query = coon.query(
        `SELECT id_user, username, nombre, apellido, edad, peso, estatura, genero FROM Usuario WHERE ((username = '${req.body.username}') AND (pass = '${req.body.pass}'))`,
        function(err,result){
            if (err){
                throw err
            }else{
                rest.send(result)
                datosAlmc = result
                if (result.length == 0){
                    console.log("Usuario o contraseña Incorrectas -->",result )
                    //rest.send(result)
                }else{
                    //pasa usarlos globalmente despues
                    console.log("El usuario inicio sesion correctamente")
                    userIdOnline = datosAlmc[0].id_user
                    console.log(userIdOnline)
                }
            }
        }
    )
})

server.listen(
    4001,
    ()=>{
        console.log("servidor en el puerto: ", 4001);
    });