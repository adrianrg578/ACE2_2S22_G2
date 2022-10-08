
const express = require('express');
const cors = require ("cors");
const db2 = require('./db2');
var coon = require('./db');
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Conexion socket
const {createServer} = require("http");
const {Server} =  require("socket.io")

//Configuracion de cors con Socket.io
const server = { createServer }.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

//Datos globales
let datosAlmc = {};
let userIdOnline;

/*const port = process.env.PORT||4001;

const {SerialPort} = require('serialport');
const {ReadlineParser}=require('@serialport/parser-readline');

//Puerto que le asigno la PC al BT 
const mySerial = new SerialPort({path:'COM6',baudRate:9600});

const parser = mySerial.pipe(new ReadlineParser({ delimiter:'\n'}))

var data_arduino;

parser.on('data',function(data){
    let temp = data.toString();
    const datos = temp.split(",");
    if(datos[1]){
        data_arduino = {BPM: datos[0], spo2: datos[1], distancia: datos[2], repeticiones: datos[3]};
        console.log(data_arduino);
        var query = coon.query(
            `INSERT INTO Datos (idUsuario, fecha, bpm, oxigeno, distancia, repeticion) VALUES (userIdOnline, '2022-10-04', ${datos[0]},${datos[1]},${datos[2]},${datos[3]});`,
            function(err){
                if(err){throw err}
            }    
        )
    }

});

mySerial.on('data', function (data){
    io.emit('datos_de_arduino',data_arduino);
})*/

//Peticiones al db
async function dataEntrenamiento(){ 
	let datos = {
        repeticiones: 0,
        rango: 0,
        calorias: 0,
        bpm: 0
    };
    try {
        const [data, field] = await (await db2.then()).execute(
            `SELECT IdEntreno, Fuerza FROM datos WHERE IdUsuario = "${userIdOnline}" AND Fuerza>0 ORDER BY IdEntreno DESC LIMIT 1;`
            
        );
        datos.fuerza = (data[0].Fuerza/(9.81)).toFixed(4)
        const [rows, fields] = await (await db2.then()).execute(
            `SELECT IdEntreno, velocidad FROM datos WHERE IdUsuario = "${userIdOnline}" AND velocidad>0 ORDER BY IdEntreno DESC LIMIT 1;`
        );
        datos.velocidad = rows[0].velocidad
        const [dataRow, fieldss] = await (await db2.then()).execute(
            `SELECT IdEntreno, ritmo, tiempo FROM datos WHERE IdUsuario = "${userIdOnline}"  AND ritmo>0 ORDER BY IdEntreno DESC LIMIT 1;`
        );
        datos.ritmo = dataRow[0].ritmo
        datos.tiempo = dataRow[0].tiempo
        
    } catch (err) {
        console.log(err);
    }
    console.log("########FUERZA#########") 
    console.log((datos.fuerza/(9.81)).toFixed(4))
    console.log("********VELOCIDAD**********")
    console.log(datos.velocidad)
    console.log("^^^^^^^^^RITMO^^^^^^^^^")
    console.log(datos.ritmo)
    console.log("!!!!!!!!TIEMPO!!!!!!!!!!")
    console.log(datos.tiempo)
	return (datos);
}

app.get("/users", function (req, res) {
    var query = coon.query(
        "SELECT * FROM Usuario;",
        function (err, result) {
            if (err) throw err
            else res.send(result)
        }
    )
})

//Solicitud de los datos a la base de datos
app.post("/datos_recolectados", function (req, res){
    console.log (req.body.idUsuario);
    coon.query(     
        `SELECT fecha, bpm, oxigeno, distancia, repeticion FROM Datos WHERE IdUsuario = ? ;`,
        [req.body.idUsuario],
        function (err, result){
            if(err){
                throw err
            }else{
                //console.log(result);
                if(result.length == 0){
                    console.log("Usuario invalido o no hay datos para este usuario")
                }else{
                    console.log("datos enviados con exito =) ")
                    res.send({"data": result})
                }
            }
        }
    )
})

//Registrar un nuevo usuario
app.post('/register', function (req, res) {
    console.log(req.body)
    var query = coon.query(
        `INSERT INTO Usuario (username, pass, nombre, apellido, edad, peso, genero, estatura) VALUES 
        ("${req.body.Username}", "${req.body.Contrasena}", "${req.body.Nombre}", "${req.body.Apellido}",
        ${parseInt(req.body.Edad)}, ${parseInt(req.body.Peso)}, "${req.body.Genero}", ${req.body.Estatura});`,
        function (err, result) {
            if (err) {
                throw err
            }
            else {
                respuesta = "Usuario: ", req.body.Username, " Registrado Correctamente"
                res.send(respuesta)
                console.log(respuesta)
            }
        }
    )
})

//Inicio de sesion
app.post("/login", function (req, res) {
    var query = coon.query(
        `SELECT idUsuario, username, nombre, apellido, edad, peso, estatura, genero FROM Usuario WHERE ((username = '${req.body.Username}') AND (pass = '${req.body.Contrasena}'))`,
        function (err, result) {
            if (err) {
                throw err
            }
            else {
                res.send(result)
                datosAlmc = result
                if (result.length == 0) {
                    console.log("Usuario o Contraseña Invalidos")
                } else {
                    //para usarlos como globaales adelante 
                    console.log("El usuario inicio sesion correctamente")
                    userIdOnline = datosAlmc[0].idUsuario
                    console.log(userIdOnline)
                }
            }
        }
    )
})

server.listen(
    4001,
    ()=>{console.log('servidor en el puerto ',4001);
});
