
const express = require('express');
const app = express();
const {createServer} = require("http");
const {Server} =  require("socket.io")
const cors = require ("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var coon = require('./db');
const db2 = require('./db2');

const server = {createServer}.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
});

const port = process.env.PORT||4001;

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
            `INSERT INTO Datos (idUsuario, fecha, bpm, oxigeno, distancia, repeticion) VALUES (1, '2022-10-04', ${datos[0]},${datos[1]},${datos[2]},${datos[3]});`,
            function(err){
                if(err){throw err}
            }    
        )
    }

});

mySerial.on('data', function (data){
    io.emit('datos_de_arduino',data_arduino);
})

//Inicio de Sesion
io.on("connection", (socket)=> {
    socket.on("login",(arg, callback)=>{
        var query = coon.query(
            `SELECT idUsuario, username, nombre, apellido, edad, peso, estatura, genero FROM Usuario WHERE ((username = '${arg.username}') AND (pass = '${arg.Contra}'))`,
            function (err, result){
                if (err){
                    throw err
                }else{
                    console.log(result)
                    if(result.length == 0){
                        console.log("usuario o contraseña invalidos")

                        callback({
                            message: "usuario o contraseña invalidos"
                        });

                        console.log("Usuario ingresado");

                    }
                }
            }
        )
    })
})

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
io.on("connection", (socket)=>{
    socket.on("registro", (arg, callback)=>{
        var query = coon.query(
            `INSERT INTO Usuario (username, pass, nombre, apellido, edad, peso, genero, estatura) VALUES ("${arg.username}","${arg.contra}","${arg.nombre}","${arg.apellido}" ,${parseInt(arg.edad)}, ${parseInt(arg.peso)},"${arg.genero}",${arg.estatura});`,
            function (err, result){
                if(err){
                    callback(
                        {message: "Error, no se pudo ingresar usuario ='( "
                    });
                }else{
                    console.log("Usuario: ", arg.nombre, " Registrado con exito!! XD")
                    callback({
                        message: "Usuario: " + arg.nombre + " Registrado con exito!! XD"
                    });
                }
            }
        )
    });
});


server.listen(4001,()=>{console.log('servidor en el puerto ',4001);
});