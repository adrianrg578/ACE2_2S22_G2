// Declaracion de variables globales

////////////////LEER MONITOR/////////////////////
char leer;                              // variable para almacenamiento de caracteres s o f para encender o apagar el sistema
boolean encendido = true;               // variable de almacenamiento de estado binario

////////////////INICIAR VISTA DE DATOS///////////
int contador = 0;                       //declaramos la variable contador iniciando en 0 para iniciar el sistema solo es un interruptor para mostrar los datos

////////////////TEMPERATURA////////////
float tempC;                            // Variable para almacenar el valor obtenido del sensor (0 a 1023) para calcular la temperatura
int pinLM35 = 0;                        // Variable del pin de entrada del sensor (A0) para calcular la temperatura

 ////////////////HALL/////////////////
int pinHALL = 6;                        //Variable del pin de entrada del sensor hall para detectar el iman de las vueltas
int contadorHall = 0;                   //Variable para el contador de veces del sensor hall para tener las vueltas y hacer la distancia recorrida
int distancia;                          // distancia recorrida TOTAL del sistema


//////////////////CRONOMETRO PARA EL SISTEMA///////////////////
unsigned long tiemposegundos = 0;       //variable para calcular el tiempo en la diferencia cuando se inicia y finaliza, tiempo TOTAL
unsigned long tiempo1 = 0;              //tiempo de inicio
unsigned long tiempo2 = 0;              //tiempo de fin

///////////////VELOCIDAD DEL SISTEMA //////////////////////////
unsigned long velocidad = 0;            //velocidad del sistema


/////////////SENSOR DE PULSO CARDIACO ///////////////////////////
int pulsePin = A7;                      // Sensor de Pulso conectado al puerto A7 para el sensor de pulso 
// Estas variables son volatiles porque son usadas durante la rutina de interrupcion en la segunda Pestaña
volatile int BPM;                       // Pulsaciones por minuto
volatile int Signal;                    // Entrada de datos del sensor de pulsos
volatile int IBI = 600;                 // tiempo entre pulsaciones
volatile boolean Pulse = false;         // Verdadero cuando la onda de pulsos es alta, falso cuando es Baja
volatile boolean QS = false;            // Verdadero cuando el Arduino Busca un pulso del Corazon



void setup(){
  pinMode(13, OUTPUT);                  //LED del sistema pulsa cada vez que colocamos el dedo en el sensor de pulso
  Serial.begin(9600);                   //iniciamos monitoreo serial a frecuencia de 96000 para deteccion de datos
  interruptSetup();                     // Configura la interrucion para leer el sensor de pulsos cada 2mS  
  Serial.println("Presiona S para iniciar y F para finalizar");     //mensaje de salida para toma de datos
  
}

void loop(){  
  int estadohall = digitalRead(pinHALL);          //leemos los datos que nos manda el sensor HALL 1 o 0 cuando detecta el iman
  int pulso = analogRead(A7);                     //Lee el valor del pulsometro conectado al puerto Analogo A7 pulsos entre 200 a 600
  leer = Serial.read();                           //almacena la lectura del puerto serial en la variable "leer" que es de tipo caracter
  if ((leer == 's')&&(encendido == true)){        //si ingresamos s y el estado s true para comenzar a tomar datos
    tiempo1 = millis();                           //se toma el tiempo inicial con la funcion millis(); que nos da el tiempo cuando se inicia arduino
    contador++;                                   //El contador aumenta 1 para iniciar a mostar imagenes
    //Serial.println("Empezamos la lectura de datos!!!!!!!!");       //Se imprime el inicio de toma de datos
    encendido = false;                            //variable para tener un seguro sobre el sistema
    delay(200);                                   //definimos un retardo de 200 milisegundos 
   }else if ((leer == 'f')&&(encendido == false)){        //si ingresamos f y es estado es false se detendra todo y limpiara las variables 
      contador = 0;                                       //reseteamos el contador a 0
      distancia = 0;                                      //reseteamos el distancia a 0
      contadorHall =0;                                    //reseteamos el conadorHall a 0
      BPM = 0;                                            //reseteamos el BPM a 0
      encendido = true;                                   //reseteamos el encendido a true
      velocidad = 0;                                      //reseteamos la velocidad a 0
     // Serial.println("salimos!!!!!!!!");                  //Mensaje de salida del sistema
    }
   if (contador == 1){
         tiempo2 = millis();                              //Se inicia tiempo 2 para hacer una diferencia entre este y el tiempo 1              
         tempC = analogRead(pinLM35);                     //Con analogRead leemos el sensor, recuerda que es un valor de 0 a 1023
         tempC = (5.0 * tempC * 100.0)/1024.0;            //Calculamos la temperatura con la fórmula                 
          if (estadohall == LOW){                         //Si es Bajo el valor es que hubo una vuelta
            contadorHall++;                               //se suma al contador hall un 1 por la vuelta dada
            distancia = contadorHall * 2 * 3.1416*20;     //Se calcula la distancia recorrida          
          }
          if (tiempo2 > (tiempo1+1000)){                  //si ha pasado 1 segundo entre tiempo2 y tiempo 1 se sacan los datos a imprimir
            tiempo1 = millis();                           //se toma el valor tiempo1 para tener el tiempo transcurrido cuando se inicio el sistema
            tiemposegundos = tiempo1/1000;                //se toma el tiempo en segundos ya que la funcion millis(); da el tiempo en milisegundos se divide entre 1000
            velocidad = distancia/tiemposegundos;         //teniendo la distancia y el tiempo transcurrrido se puede calcular la velociadad media
            //Serial.println("/////////////////////////////////");
            //Serial.print(" Temperatura C->");               //imprimimos mensaje
          //  Serial.println(tempC);                          //Envia el dato al puerto serial, son calculados en grados Celcius
            //Serial.print(" Distancia Cm->");                //imprimimos mensaje       
          //  Serial.println(distancia);                      //Envia el dato al puerto serial, son calculados en cm
            //Serial.print(" Tiempo Segundos->");             //imprimimos mensaje
          //  Serial.println(tiemposegundos);                 //Envia el dato al puerto serial, son segundos 
            //Serial.print(" Velocidad Cm/S->");              //imprimimos mensaje
           // Serial.println(velocidad);                      //Envia el dato al puerto serial, son cm sobre segundos cm/s
            //Serial.print("BPM -> ");                        //imprimimos mensaje
           // Serial.println(BPM);                            //Envia el dato al puerto serial, son pulsacione por minuto
            //Serial.println("/////////////////////////////////");
            //Serial.println(tempC+','+distancia+','+tiemposegundos+','+velocidad+','+BPM);
            String datos="";
            datos.concat(tempC);
            datos.concat(",");
            datos.concat(distancia);
            datos.concat(",");
            datos.concat(tiemposegundos);
            datos.concat(",");
            datos.concat(velocidad);
            datos.concat(",");
            datos.concat(BPM);
            Serial.println(datos);
           }
          delay(200);                             //Esperamos un tiempo para repetir el loop 200 milisegundos
          if (QS == true){                       // Bandera del Quantified Self es verdadera cuando el Arduino busca un pulso del corazon(para estabilizar el sensor de pulso)
            QS = false;                          // Reset a la bandera del Quantified Self para el sensor de pulso
          }
    } 
 }
