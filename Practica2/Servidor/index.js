const { Socket } = require('dgram');
const express = require('express');
const app = express();
const {createServer} = require("http");
const {Server} =  require("socket.io")
const cors = require ("cors");
app.use(cors());

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
const {ReadlineParser}=require('@serialport/parser-readline')

//Puerto que le asigno la PC al BT 
const mySerial = new SerialPort({path:'COM6',baudRate:9600});

const parser = mySerial.pipe(new ReadlineParser({ delimiter:'\n\r'}))

var data_arduino;

parser.on('data',function(data){
    let temp = data.toString();
    const datos = temp.split(",");
    if(datos[1]){
        data_arduino = {BPM: datos[0], spo2: datos[1], distancia: datos[2], repeticiones: datos[3]};
        console.log(data_arduino);   
    }

});

mySerial.on('data', function (data){
    io.emit('datos_de_arduino',data_arduino);
})



server.listen(4001,()=>{console.log('servidor en el puerto ',4001);
});