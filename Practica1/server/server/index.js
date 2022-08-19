const express = require('express');
const app = express();
const {createServer} = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = {createServer}.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
});

const port = process.env.PORT||4001;
//const index = require("./routes/index");



//var servidor = app.listen(port,function(){console.log("escuchando servidor",servidor.address())})
//var io = require('socket.io')(servidor)
//const httpServer = createServer(app);
//const io = new Server(httpServer,{});


const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const mySerial = new SerialPort({path:'COM4',baudRate: 9600}); //corregir puerto segun el arduino


const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\n' }))

let bandera = false;

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname+'/index.html');
    //res.set('Access-Control-Allow-Origin','http://localhost:3000');
});

mySerial.on('open', function(){
    mySerial.write('s');
    console.log('Puerto serial abierto');
});



var data_arduino;
//var contador; //variable utilizada para hacer pruebas de emision en un arduino uno, no relacionado a la practica


parser.on('data', function (data){
    let temp = data.toString();
   const datos = temp.split(",");
   // contador = data.toString();
    data_arduino = {temperatura: datos[0],distancia: datos[1], tiempo: datos[2],velocidad: datos[3],BPM: datos[4]};

    console.log(data_arduino);

    if (bandera==false){
        mySerial.write('s');
        //console.log("si entro XD");
        bandera = true;
    }
});

mySerial.on('data', function(data){
    io.emit('datos_arduino', data_arduino);
});

/*io.on('connection', (socket) =>{
    socket.emit("contador",contador);
});*/


server.listen(4001, ()=>{
    console.log('server en el puerto', 4001);
});