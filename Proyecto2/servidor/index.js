const express = require('express')
const cors = require("cors")
const db2 = require('./db2')
var coon = require('./db')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//conexion socket
const { createServer } = require("http");
const { Server } = require("socket.io");

//configuracion de cors con Socket.io
const server = { createServer }.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeader: ["Access-Control-Allow-Origin", "*"],
        credentials: true
    }
});

//datos globales
var datos_del_arduino;
var today = new Date();
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

//enmision de los datos completos
mySerial.on('data',function(data){
    io.emit('datos_de_arduino',datos_del_arduino);
})


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


function calculo_impulso(peso_ard,) {
    let resultado;

    if (peso_ard > 49 && peso_ard < 95) {
        resultado = peso_ard * 2
    } else {
        resultado = 0;
    }
    return resultado;
}


//Retorna los usuarios en la base de datos
app.get("/users", function (req, res) {
    var query = coon.query(
        "SELECT * FROM Usuario;",
        function (err, result) {
            if (err) throw err
            else res.send(result)
        }
    )
})

//Peticiones al db
async function dataEntrenamiento() {
    let datos = {
        FuerzaImpulso: 0,
        FuerzaLlegada: 0,
        PesoJumpBox: 0,
        fecha: today.toLocaleString(),
        tiempo: 0
    };

    try {
        const [dataFI, field0] = await (await db2.then()).execute(
            `SELECT id_Dato, fuerza_impulso FROM Datos WHERE id_user = ${userIdOnline} AND fuerza_impulso>0 
            ORDER BY id_Dato DESC LIMIT 1;`
        );
        datos.FuerzaImpulso = dataFI[0].fuerza_impulso

        const [dataFL, field1] = await (await db2.then()).execute(
            `SELECT id_Dato, fuerza_llegada FROM Datos WHERE id_user = ${userIdOnline} AND fuerza_impulso>0 
            ORDER BY id_Dato DESC LIMIT 1;`
        );
        datos.FuerzaLlegada = dataFL[0].fuerza_llegada

        const [dataP, field2] = await (await db2.then()).execute(
            `SELECT id_Dato, peso_arduino FROM Datos WHERE id_user =  ${userIdOnline} AND peso_arduino>0 
            ORDER BY id_Dato DESC LIMIT 1;`
        );
        datos.PesoJumpBox = dataP[0].peso_arduino
        datos.tiempo = time.toFixed(2)
    } catch (err) {
        console.log(err);
    }
    /*console.log("#######FuerzaI#######")
    console.log((datos.FuerzaImpulso))
    console.log(".......FuerzaL.......")
    console.log((datos.FuerzaLlegada))
    console.log("********Peso**********")
    console.log(datos.PesoJumpBox)
    console.log("////////fecha////////")
    console.log(datos.fecha)
    console.log("^^^^^^^^tiempo^^^^^^^^")
    console.log(datos.tiempo)*/
    return datos;
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

//registra un nuevo usuario a la base de datos
app.post('/register', function (req, res) {
    var query = coon.query(
        `INSERT INTO Usuario (nombre, apellido, username, pass, edad, peso, genero, estatura) VALUES 
        ("${req.body.Nombre}", "${req.body.Apellido}", "${req.body.Username}", "${req.body.Contrasena}", 
        ${parseInt(req.body.Edad)}, ${parseInt(req.body.Peso)}, "${req.body.Genero}", ${req.body.Estatura});`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                respuesta = "Usuario: " + req.body.Username + "Registrado correctamente"
                res.send(respuesta)
                console.log(respuesta)
            }
        }
    )
})

//Inicio de sesion
app.post("/login", function (req, rest) {
    var query = coon.query(
        `SELECT id_user, username, nombre, apellido, edad, peso, estatura, genero FROM Usuario WHERE ((username = '${req.body.Username}') AND (pass = '${req.body.Contrasena}'))`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                rest.send(result)
                datosAlmc = result
                if (result.length == 0) {
                    console.log("Usuario o contraseña Incorrectas -->")
                    rest.send("Usuario o contraseña Incorrectas -->", result)
                } else {
                    //pasa usarlos globalmente despues
                    console.log("El usuario inicio sesion correctamente")
                    userIdOnline = datosAlmc[0].id_user
                    console.log(userIdOnline)
                }
            }
        }
    )
})

//Fuerza de llegada
app.post("/fuerzafecha", function (req, rest) {
    var query = coon.query(
        `SELECT fecha, peso, GROUP_CONCAT(fuerza_llegada) AS dato
            FROM Datos as D
            INNER JOIN Usuario U ON U.id_user = D.id_user
            WHERE D.id_user = "${userIdOnline}"
            AND fecha ="${req.body.Fecha}"
            GROUP BY fecha`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                rest.send(result)
                datosAlmc = result
                console.log(result);
            }
        }
    )
})

app.post("/fuerza", function (req, rest) {
    //console.log(req.body)
    coon.query(
        `SELECT GROUP_CONCAT(fuerza_impulso) AS fuerzaimpulso, GROUP_CONCAT(fuerza_llegada) AS fuerzallegada
            FROM Datos as D
            WHERE D.id_user = ${req.body.IdUser}`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                rest.send(result[0])
                datosAlmc = result
                console.log('delta fuerza');
            }
        }
    )
})

app.post("/calorias", function (req, rest) {
    var query = coon.query(
        `SELECT GROUP_CONCAT(d.id_Dato) AS dato, u.peso
            FROM Datos as d
            INNER JOIN Usuario u 
            on u.id_user = d.id_user
            WHERE d.id_user = ${req.body.IdUser}`,
        function (err, result) {
            if (err) {
                throw err
            } else {

                let datos = {};
                let peso_actual;

                result.forEach(function (row) {

                    peso_actual = row.peso;

                    row.calorias_quemadas = row.dato.toString().split(',').map(function (value) {
                        return { calorias: Number(value) };
                    });
                    delete row.dato;
                    delete row.peso;

                })

                result.forEach(function (row) {
                    var i_max = row.calorias_quemadas.length - 1;
                    var tiempo_min = row.calorias_quemadas[0].calorias;
                    var tiempo_max = row.calorias_quemadas[i_max].calorias;
                    let tiempo = 0;
                    row.calorias_quemadas.forEach(function (value) {
                        tiempo = tiempo_max - (tiempo_max - value.calorias + tiempo_min);
                        value.calorias = (0.049 * (peso_actual / 2.205) * 2.2 * (tiempo / 60)).toFixed(2);
                        value.calorias = parseFloat(value.calorias)
                    })
                })

                rest.send(result[0]);
            }
        }
    )
})

app.post("/caloriasfecha", function (req, rest) {
    var query = coon.query(
        `SELECT fecha, peso, GROUP_CONCAT(id_Dato) AS dato
            FROM Datos as D
            INNER JOIN Usuario U ON U.id_user = D.id_user
            WHERE D.id_user = "${userIdOnline}"
            AND fecha ="${req.body.Fecha}"
            GROUP BY fecha`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                let datos = {};
                let peso_actual;
                result.forEach(function (row) {
                    peso_actual = row.peso;
                    row.calorias_quemadas = row.dato.toString().split(',').map(function (value) {
                        return { calorias: Number(value) };
                    });
                    delete row.dato;
                    delete row.peso;
                })

                result.forEach(function (row) {
                    var i_max = row.calorias_quemadas.length - 1;
                    var tiempo_min = row.calorias_quemadas[0].calorias;
                    var tiempo_max = row.calorias_quemadas[i_max].calorias;

                    let tiempo = 0;
                    row.calorias_quemadas.forEach(function (value) {
                        tiempo = tiempo_max - (tiempo_max - value.calorias + tiempo_min);
                        value.calorias = (0.049 * (peso_actual / 2.205) * 2.2 * (tiempo / 60)).toFixed(2);
                    })
                })

                //datos = JSON.stringify(result)
                rest.send(result);
            }
        }
    )
})

app.post("/ritmo", function (req, rest) {
    var query = coon.query(
        `SELECT GROUP_CONCAT(fuerza_llegada) AS dato
            FROM Datos as D
            INNER JOIN Usuario U ON U.id_user = D.id_user
            WHERE D.id_user = ${req.body.IdUser}`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                
                let datos = {};
                result.forEach(function (row) {
                    row.ritmo = row.dato.toString().split(',').map(function (value) {
                        return { acierta: Number(value) };
                    });
                    delete row.dato;
                })

                let frecuencia = req.body.Frecuencia;
                let aux = 1;

                result.forEach(function (row) {
                    row.ritmo.forEach(function (value) {
                        if (value.acierta < 10) {
                            value.acierta = 0
                        }
                        else if (aux % frecuencia == 0) {
                            if (value.acierta > 5) {
                                value.acierta = 1
                            }
                        }
                        else {
                            value.acierta = -1
                        }
                        aux++;
                    })
                })
                //datos = JSON.stringify(result)
                rest.send(result[0]);
            }
        }
    )
})

app.post("/ritmofecha", function (req, rest) {
    var query = coon.query(
        `SELECT fecha, GROUP_CONCAT(fuerza_llegada) AS dato
            FROM Datos as D
            INNER JOIN Usuario U ON U.id_user = D.id_user
            WHERE D.id_user = "${userIdOnline}"
            AND fecha ="${req.body.Fecha}"
            GROUP BY fecha`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                let datos = {};
                result.forEach(function (row) {
                    row.ritmo = row.dato.toString().split(',').map(function (value) {
                        return { acierta: Number(value) };
                    });
                    delete row.dato;
                })

                let frecuencia = req.body.Frecuencia;
                let aux = 1;

                result.forEach(function (row) {
                    row.ritmo.forEach(function (value) {
                        if (value.acierta < 10) {
                            value.acierta = 0
                        }
                        else if (aux % frecuencia == 0) {
                            if (value.acierta > 10) {
                                value.acierta = 1
                            }
                        }
                        else {
                            value.acierta = -1
                        }
                        aux++;
                    })
                })

                //datos = JSON.stringify(result)
                rest.send(result);
            }
        }
    )
})

app.post("/infoext", function (req, res) {
    var query = coon.query(
        `SELECT fecha, id_Entrenamiento, CONCAT(MAX(id_Dato) - MIN(id_Dato)) as tiempo_entreno
        FROM Datos as D
        INNER JOIN Usuario U ON U.id_user = D.id_user
        WHERE D.id_user = "${userIdOnline}" AND fecha between '${req.body.FechaI}' AND '${req.body.FechaF}'
        GROUP BY fecha, id_Entrenamiento`,
        function (err, result) {
            if (err) {
                throw err
            } else {
                res.send(result);
            }
        }
    )
})

function esLunes(date = new Date()) {
    return date.getDay() === 1;
}

function buscarLunes(date = new Date()) {
    if (date.getDay === 1) {
        return date
    }
    else {
        while (date.getDay != 1) {
            date.setDate(date.getDate() - 1);
        }
        return date
    }
}

server.listen(
    4001,
    () => {
        console.log("servidor en el puerto: ", 4001);
    });