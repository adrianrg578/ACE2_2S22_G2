const express = require('express')
const cors = require("cors")
const db2 = require('./db2')
var coon = require('./db')
const app  = require('express')

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

var today =new Date();
let datosAlmc = {};

const port = process.env.PORT || 4001;

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

//Puerto que le asigno la PC al BT
const mySerial = new SerialPort({path:'COM4', baudRate:9600});

const parser = mySerial.pipe(new ReadlineParser({delimiter: '\n'}))

var datos_del_arduino;

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
        console.log(datos_del_arduino);
       /* var query = coon.query(
            `INSERT INTO Datos (idUsuario, fecha, bpm, oxigeno, distancia, repeticion) VALUES (${userIdOnline}, ${formattedDate}, ${datos[0]},${datos[1]},${datos[2]},${datos[3]});`,
            function(err){
                if(err){throw err}
            }    
        )*/
    }
})

mySerial.on('data',function(data){
    io.emit('datos_de_arduino',datos_del_arduino);
})

server.listen(
    4001,
    ()=>{
        console.log("servidor en el puerto: ", 4001);
    });