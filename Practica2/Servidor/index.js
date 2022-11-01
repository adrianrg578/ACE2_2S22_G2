
const express = require('express');
const cors = require("cors");
const db2 = require('./db2');
var coon = require('./db');
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Conexion socket
const { createServer } = require("http");
const { Server } = require("socket.io")

//Configuracion de cors con Socket.io
const server = { createServer }.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin", "*"],
        credentials: true
    }
});

//Datos globales
var today = new Date();
let datosAlmc = {};
let userIdOnline = 1;
let start = 0;
let time = 0;

const port = process.env.PORT || 4001;

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

//Puerto que le asigno la PC al BT 

/*const mySerial = new SerialPort({path:'COM6',baudRate:9600});

const parser = mySerial.pipe(new ReadlineParser({ delimiter:'\n'}))

var data_arduino;

parser.on('data',function(data){

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    var year = hoy.toLocaleDateString("default", {year: "numeric"});
    var month = hoy.toLocaleDateString("default",{month: "2-digit"});
    var day = hoy.toLocaleDateString("default", {day: "2-digit"});
    var formattedDate = '"' + year + "-"+month+"-"+day +'"';


    let dateNow = hoy.toLocaleDateString('en-us', { dateStyle: 'short'})
    let temp = data.toString();
    const datos = temp.split(",");
    if(datos[1]){
        data_arduino = {BPM: datos[0], spo2: datos[1], distancia: datos[2], repeticiones: datos[3]};
        console.log(data_arduino);
        var query = coon.query(
            `INSERT INTO Datos (idUsuario, fecha, bpm, oxigeno, distancia, repeticion) VALUES (${userIdOnline}, ${formattedDate}, ${datos[0]},${datos[1]},${datos[2]},${datos[3]});`,
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
async function dataEntrenamiento() {
    let datos = {
        repeticion: 0,
        calorias: 0,
        tiempo: 0,
        rango: 0,
        fecha: 0,
        BPM: 0,
    };
    try {
        const [data, field] = await (await db2.then()).execute(
            `SELECT id_Dato, peso_arduino FROM Datos WHERE id_user = 1 AND
             peso_arduino>0 ORDER BY id_Dato DESC LIMIT 1;`
        );
        
        datos.calorias = (0.049 * (data[0].peso_arduino / 2.205) * 2.2 * time).toFixed(2);
        datos.repeticion = (data[0].peso_arduino);
        datos.fecha = today.toLocaleString()
        datos.rango = data[0].peso_arduino;
        datos.tiempo = time.toFixed(2)
        datos.BPM = (data[0].peso_arduino);

    } catch (err) {
        console.log(err);
    }
    console.log("########Repeticion#########")
    console.log((datos.repeticion))
    console.log("********Rango**********")
    console.log(datos.rango)
    console.log("^^^^^^^^^Calorias^^^^^^^^^")
    console.log(datos.calorias)
    console.log("!!!!!!!!BPM!!!!!!!!!!")
    console.log(datos.BPM)
    return (datos);
}

async function obtenerFrecuencia() {
    let datos = {};
    try {
        const [data] = await (await db2.then()).execute(
            `SELECT bpm FROM Datos as D
            WHERE D.idUsuario = "${userIdOnline}";`

        );
        datos = JSON.stringify(data)
    } catch (err) {
        console.log(err);
    }
    return (datos);
}



async function obtenerFrecuenciaPorFecha() {
    let datos = {};
    try {

        (await db2).execute(`SET SESSION group_concat_max_len = 1000000;`)

        const [data] = await (await db2.then()).execute(
            `SELECT fecha, GROUP_CONCAT(bpm) AS bpm
            FROM Datos as D
            WHERE D.idUsuario = "${userIdOnline}"
            GROUP BY fecha`

        );

        data.forEach(function (row) {
            row.frecuencia = row.bpm.toString().split(',').map(function (value) {
                return { bpm: Number(value) };
            });
            delete row.bpm;
        })

        datos = JSON.stringify(data)

    } catch (err) {
        console.log(err);
    }
    return (datos);
}

async function obtenerRango() {
    let datos = {};
    try {
        const [data] = await (await db2.then()).execute(
            `SELECT distancia FROM Datos as D
            WHERE D.idUsuario = "${userIdOnline}";`

        );
        //console.log(data) 
        datos = JSON.stringify(data)
    } catch (err) {
        console.log(err);
    }
    return (datos);
}

async function obtenerRangoPorFecha() {
    let datos = {};
    try {

        (await db2).execute(`SET SESSION group_concat_max_len = 1000000;`)

        const [data] = await (await db2.then()).execute(
            `SELECT fecha, GROUP_CONCAT(distancia) AS distancia
            FROM Datos as D
            WHERE D.idUsuario = "${userIdOnline}"
            GROUP BY fecha`

        );

        data.forEach(function (row) {
            row.rango = row.distancia.toString().split(',').map(function (value) {
                return { distancia: Number(value) };
            });
            delete row.distancia;
        })

        datos = JSON.stringify(data)

    } catch (err) {
        console.log(err);
    }
    return (datos);
}

async function obtenerCalorias() {
    let datos = {};
    try {
        const [data] = await (await db2.then()).execute(
            `SELECT fecha, peso FROM Datos as D
            INNER JOIN Usuario U ON U.idUsuario = D.idUsuario
            WHERE D.idUsuario = "${userIdOnline}"`

        );
        let tiempo = 0;
        datos.calorias = [];
        data.forEach(function (currentValue, index) {
            datos.calorias.push({ calorias: (0.049 * (currentValue.peso / 2.205) * 2.2 * (tiempo / 60)).toFixed(2) });
            tiempo++;
        }
        );

    } catch (err) {
        console.log(err);
    }
    return (JSON.stringify(datos.calorias));
}

async function obtenerCaloriasPorFecha() {
    let datos = {};
    try {

        (await db2).execute(`SET SESSION group_concat_max_len = 1000000;`)

        const [data] = await (await db2.then()).execute(
            `SELECT fecha, peso, GROUP_CONCAT(idDato) AS dato
            FROM Datos as D
            INNER JOIN Usuario U ON U.idUsuario = D.idUsuario
            WHERE D.idUsuario = "${userIdOnline}"
            GROUP BY fecha`

        );

        let peso_actual;
        data.forEach(function (row) {
            peso_actual = row.peso;
            row.calorias_quemadas = row.dato.toString().split(',').map(function (value) {
                return { calorias: Number(value) };
            });
            delete row.dato;
            delete row.peso;
        })

        data.forEach(function (row) {
            var i_max = row.calorias_quemadas.length - 1;
            var tiempo_min = row.calorias_quemadas[0].calorias;
            var tiempo_max = row.calorias_quemadas[i_max].calorias;

            let tiempo = 0;
            row.calorias_quemadas.forEach(function (value) {
                tiempo = tiempo_max - (tiempo_max - value.calorias + tiempo_min);
                value.calorias = (0.049 * (peso_actual / 2.205) * 2.2 * (tiempo / 60)).toFixed(2);
            })
        })

        datos = JSON.stringify(data)

        /*for (var i = 0; i < datos.length; i++) {
            var no_max = datos[i].calorias_quemadas.length-1;
            //var no_min = element.calorias[0].calorias;
            for( var j = 0; j < datos[i].calorias.length; j++) {
                
            };
        };*/


    } catch (err) {
        console.log(err);
    }
    return (datos);
}

//Conexion cliente-Servidor
io.on('connection', async function (socket) {
    console.log("conectadoDatos!");
    if (start === 1) {
        time += (1 / 60);
    } else {
        time = 0;
    }
    console.log("Stados ", start, " Tiempo ", time)
    socket.emit('datos', await dataEntrenamiento());
    
});

//Cambio de estado
app.post("/start", function (req, res) {
    start = req.body.state
})

//Solicitud de los datos a la base de datos
app.post("/datos_recolectados", function (req, res) {
    console.log(req.body.idUsuario);
    coon.query(
        `SELECT fecha, bpm, oxigeno, distancia, repeticion FROM Datos WHERE IdUsuario = ? ;`,
        [req.body.idUsuario],
        function (err, result) {
            if (err) {
                throw err
            } else {
                //console.log(result);
                if (result.length == 0) {
                    console.log("Usuario invalido o no hay datos para este usuario")
                } else {
                    console.log("datos enviados con exito =) ")
                    res.send({ "data": result })
                }
            }
        }
    )
})

app.post("/frecuencia", function (req, res) {
    console.log(req.body.Username);
    coon.query(
        `SELECT DISTINCT bpm FROM Datos inner join Usuario u on u.username = ? ;`,
        [req.body.Username],
        function (err, result) {
            if (err) {
                throw err
            } else {
                //console.log(result);
                if (result.length == 0) {
                    console.log("Usuario invalido o no hay datos para este usuario")
                } else {
                    console.log("datos enviados con exito =) ")
                    res.send({ "data": result })
                }
            }
        }
    )
})

app.post("/rango", function (req, res) {
    console.log(req.body.Username);
    coon.query(
        `SELECT DISTINCT distancia FROM Datos inner join Usuario u on u.username = ? ;`,
        [req.body.Username],
        function (err, result) {
            if (err) {
                throw err
            } else {
                //console.log(result);
                if (result.length == 0) {
                    console.log("Usuario invalido o no hay datos para este usuario")
                } else {
                    console.log("datos enviados con exito =) ")
                    res.send({ "data": result })
                }
            }
        }
    )
})

app.post("/calorias", function (req, res) {
    
    let datos = {};
    coon.query(
        `SELECT fecha, peso FROM Datos inner join Usuario u on u.username = ? ;`,
        [req.body.Username],
        function (err, result) {
            if (err) {
                throw err
            } else {
                //console.log(result);
                if (result.length == 0) {
                    console.log("Usuario invalido o no hay datos para este usuario")
                } else {
                    console.log("datos enviados con exito =) ")
                    res.send({ "data": result })
                }
            }
        }
    )
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
        `SELECT id_user, username, nombre, apellido, edad, peso, estatura, genero FROM Usuario WHERE ((username = '${req.body.Username}') AND (pass = '${req.body.Contrasena}'))`,
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
    () => {
        console.log('servidor en el puerto ', 4001);
    });
