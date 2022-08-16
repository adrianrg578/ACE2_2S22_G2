const express = require('express');
const {createServer} = require('http');
const {Server} = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{});

const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const mySerial = new SerialPort({path:'COM4',baudRate: 9600});

const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\n' }))
//parser.on('data',console.log)

let bandera = false;

mySerial.on('open', function(){
    mySerial.write('s');
    console.log('Puerto serial abierto');
});

parser.on('data', function (data){
    let temp = data.toString();
   const datos = temp.split(",");
    console.log(datos[3]);
    
    //console.log(data.toString());
    //mySerial.write('s');

    if (bandera==false){
        mySerial.write('s');
        console.log("si entro XD");
        bandera = true;
    }
});


httpServer.listen(3001, ()=>{
    console.log('server en el puerto', 3001);
});