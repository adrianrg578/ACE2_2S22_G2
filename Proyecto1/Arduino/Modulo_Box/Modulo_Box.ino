//----------------------------------------------------------------------------------------------
//VARIBALES Y LIBRERIAS PARA MODULO DE ACELERACION(GOLPE)
// Librerias I2C para controlar el mpu6050
// la libreria MPU6050.h necesita I2Cdev.h, I2Cdev.h necesita Wire.h
#include "I2Cdev.h"
#include "MPU6050.h"
#include "Wire.h"
// La dirección del MPU6050 puede ser 0x68 o 0x69, dependiendo
// del estado de AD0. Si no se especifica, 0x68 estará implicito
MPU6050 sensor;

// Valores RAW (sin procesar) del acelerometro y giroscopio en los ejes x,y,z
int ax, ay, az;

//Valores RAW (procesados en m_s2) del aceleremotro en los ejes x,y,z
float ax_m_s2;
float ay_m_s2;
float az_m_s2;

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//VARIBALES Y LIBRERIAS PARA MODULO DE BOTONES(VELOCIDAD/TIEMPO)
//Boton de velocidad
int BV = 61;
//Boton de ritmo
int BR = 60;
//Boton de golpe
int BP = 59;
//Boton de limpiar datos
int BSB = 58;
//Variable de seleccion
int rango = 0;

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//VARIBALES Y LIBRERIAS PARA MODULO DE GOLPES(VELOCIDAD/TIEMPO)
//Pin de fotoresistencia
int Fotoresistencia = A0;
//Variable de analogo de Velocidad
int aV;

//Contador de golpes para la velocidad
unsigned long contadorGolpes = 0;

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//VARIBALES Y LIBRERIAS PARA MODULO DE RITMO(VELOCIDAD TIEMPO INDEFINIDO PERO ALARMA CADA .5 SEGUNDOS)
//Pin de buzzer para el sonido
int BuzzerPin = 7;
//Pin de sensor de golpes
int SensorRitmo = A1;
//Tiempo de Fin
unsigned long t_f = 0;
//Tiempo de Inicio
unsigned long t_i = 0;
//Tiempo de Entretiempo
unsigned long t_e = 0;

unsigned long tiempo1 = 0;
// Esta variable se cambia dependiendo de la luz que este
int intensidad_luz = 200;
//Contador de tiempo para la velocidad
unsigned long contadorVelocidad = 0;

float aceleracion_bola;
float fuerza_golpe;
float velocidad_golpe;

//unsigned long tiempo = 0;
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------


void setup() {

  //Configuracion Wifi

  //Configuramos pines
  pinMode(BV, INPUT);
  pinMode(BR, INPUT);
  pinMode(BP, INPUT);
  pinMode(BSB, INPUT);
  pinMode(BuzzerPin, OUTPUT);
  //Damos valor al pin para que no haga sonido
  digitalWrite(BuzzerPin, HIGH);
  //Inicializamos el monitor en serie
  Serial.begin(9600);
  //Iniciando I2C
  Wire.begin();
  //Iniciando el sensor
  sensor.initialize();
  tiempo1 = millis();

  //Probamos el sensor si funciona
  if (sensor.testConnection()) Serial.println("Sensor iniciado correctamente");
  else Serial.println("Error al iniciar el sensor!!!!!");

}

void loop() {

  //Hacemos lectura del modulo de boton

  String datos = "";
  int temp = digitalRead(BV);
  int temp1 = digitalRead(BR);
  int temp2 = digitalRead(BP);
  int temp3 = digitalRead(BSB);

  //Asignamos valores fijos
  if (temp == 0) {
    rango = 1;
  }
  if (temp1 == 0) {
    rango = 3;
  }
  if (temp2 == 0) {
    rango = 2;
  }
  if (temp3 == 0) {
    rango = 4;
  }


  //Mediante un switch hacemos los modulos de velocidad,ritmo,golpe,libre
  switch (rango) {
    case 1:
      //Serial.println("fuerza");
      contadorGolpes = 0;
      //
      //asignamos la entrada analogica de la fotoresistencia esta da valores de 700 para arriba en poca luz
      aV = analogRead(Fotoresistencia);
      //Serial.print("Intensity=");
      //Serial.println(aV);         //mostramos la informacion analogica para hacer la variacion
      delay(200);
      //En esta parte del if configuramos la luz en mi situacion con 700 de sombra da bien para otro ambiente ahy que cambiar y ver la variacion
      //Por ejemplo cuando subo la pera y tapo la luz me da una salida analogica mayor a 700 cuando destapo osea la quito me da valores menores de 700

      tiempo1 = millis();

      if (aV > intensidad_luz) {
        contadorGolpes++;

        //Serial.print("Golpes=");
        //Serial.println(contadorGolpes);
        //Serial.print("Golpes=");
        //Serial.println(contadorGolpes);
        //Serial.println(tiempo1);
        aceleracion();
        if (fuerza_golpe > 0.99) {
          datos.concat(1);
          datos.concat(",");
          datos.concat(fuerza_golpe);
          datos.concat(",");
          datos.concat(contadorGolpes);
          Serial.println(datos);
        }
        //Serial.print(",");
        //Serial.println(contadorGolpes);

      }
      break;

    case 2:
      //Serial.println("velocidad");
      contadorGolpes = 0;
      //
      aceleracion();
      if (aceleracion_bola > 0.99) {
        contadorGolpes++;
        datos.concat(2);
        datos.concat(",");
        datos.concat(velocidad_golpe);
        datos.concat(",");
        datos.concat(contadorGolpes);
        Serial.println(datos);
        //Serial.println(velocidad_golpe);
      }
      break;
    case 3:
      //Serial.println("ritmo");
      contadorGolpes = 0;

      t_f = millis();
      if (t_f > t_i) {
        t_e = t_f - t_i;
      }
      //Se lee el sensor de golpe y si es positivo manda mensaje de golpe y se espera 3 segundos para que el sensor se estabilize
      //Tambien se asigna el tiempo inicial y se manda un mensaje de golpe o un uno comenta el que no utilizaras
      if (digitalRead(SensorRitmo) == 1) {
        //Serial.println("golpe");
        contadorGolpes++;
        datos.concat(3);
        datos.concat(",");
        datos.concat("1");
        datos.concat(",");
        datos.concat(contadorGolpes);
        Serial.println(datos);

        delay(3000);
        t_i = millis();
      }
      //En este apartado se tiene una espera de 2 segundos si se pasa de eso sonara la alarma 0.5 segundos
      //Para hacer un cambio en la alarma cambiar el 2000 a el tiempo que quiera la alarma
      //Tambien se asigna el tiempo inicial y se manda un mensaje de alarma o un cero comenta el que no utilizaras
      if (t_e > 2000) {
        digitalWrite(BuzzerPin, LOW);
        //Serial.println("alarma");
        //Serial.println(0);
        delay(500);
        digitalWrite(BuzzerPin, HIGH);
        t_i = millis();
        delay(500);
      }
      break;

    case 4:
      //Serial.print("LIMPIAMOS VARIABLES");
      contadorGolpes = 0;
      //Serial.print("Golpes=");
      //Serial.println(contadorGolpes);
      rango = 0;
      break;
    default:
      Serial.println("Esperando Ordenes!!!");
      break;
  }
}



void aceleracion() {
  sensor.getAcceleration(&ax, &ay, &az);
  ax_m_s2 = ax * (9.81 / 16384.0);
  ay_m_s2 = ay * (9.81 / 16384.0);
  //az_m_s2 = az * (9.81/16384.0);
  //Mostrar las lecturas separadas por un [tab]
  //Serial.print("a[x y z](m/s2) g[x y z](deg/s):\t");
  //Se resta el valor de 3.20 ya que al no estar bien puesto el modulo de aceleracion tiene -3 grados de inclinacion afecta
  //La lectura del sensor cuando se cambie el valor quitar el -3.20 para ver la aceleracion que nos da y quitar esa asi no afectar
  //La lectura del sensor
  //Serial.print("AX: ");
  //Serial.print(ax_m_s2 - 3.10); //Serial.print("\t");
  //Serial.print(" AY: ");
  //Serial.print(ay_m_s2 + 0.7); Serial.println("\t");
  //Serial.println("----");
  aceleracion_bola = abs(sqrt(pow(ax_m_s2, 2) + pow(ay_m_s2, 2)) - 3);
  fuerza_golpe = aceleracion_bola * 0.907;
  velocidad_golpe = aceleracion_bola * (3);

  //Serial.print(az_m_s2); Serial.print("\t");
  delay(100);
}
