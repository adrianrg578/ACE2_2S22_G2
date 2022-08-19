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

//Base de datos Firebase

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getDatabase, ref, set } = require("firebase-admin/database");
const admindb = require("firebase-admin/database")

var config = {
    credential: applicationDefault(),
    databaseURL: 'https://practica1-arq2-default-rtdb.firebaseio.com'
};

const ejec = initializeApp(config);
const database = getDatabase(ejec);

var hoy = new Date();
var mes = hoy.getMonth();
var dia = hoy.getDate();

const refer = database.ref('indoor/registros/'+mes + '/18' );

let bandera = false;

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname+'/index.html');
    //res.set('Access-Control-Allow-Origin','http://localhost:3000');
});


app.get('/retomar_datos',(req,res)=>{
    var Datos_recuperados = {
        "indoor":
        {
        "registros":[]
        }
    };
    const recuperar = database.ref('indoor/registros/'+mes+'/'+req.query.fecha);
    recuperar.on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            Datos_recuperados.indoor.registros.push(childData);
        });
        res.json(Datos_recuperados);
    });
});

mySerial.on('open', function(){
    mySerial.write('s');
    console.log('Puerto serial abierto');
});



var data_arduino;
var datoactual = 0;
//var contador; //variable utilizada para hacer pruebas de emision en un arduino uno, no relacionado a la practica


parser.on('data', function (data){
    let temp = data.toString();
   const datos = temp.split(",");
   // contador = data.toString();
   if(datos[1])
    data_arduino = {temperatura: datos[0],distancia: datos[1], tiempo: datos[2],velocidad: datos[3],BPM: datos[4]};

    //console.log(data_arduino);
    if(datoactual != datos[2])
        {
            //writeData(data_arduino); //descomentar luego
            datoactual = datos[2];
        }

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



function writeData(data_arduino) {
    const db = database;
    refer.push(data_arduino);
}


server.listen(4001, ()=>{
    console.log('server en el puerto', 4001);
});