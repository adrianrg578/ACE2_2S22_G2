//Variables para las imagenes
PImage temperature;
PImage calories;

//Variables para los textos
String labelTemperature = "Temperatura Corporal";
String labelBPM = "Frecuencia Cardiaca";
String labelCalories = "Calorias Quemadas";

//Colores par la temperatura
float red;
float green;
float blue;

//Variables
float tempValue = 15;
float BPMValue = 60;
float calValue = 0;
int lastSecond = 0;
int tiempoConsulta = 0;

//BPM
int xspacing = 1;   // Que tan separadas estaran las particulas
int w;              // Ancho de la onda completa
int maxwaves = 4;   // Total de ondas que se anaden juntas

float theta = 0.0;
float[] amplitude = new float[maxwaves];   // Alto de la onda
float[] dx = new float[maxwaves];          // Value for incrementing X, to be calculated as a function of period and xspacing
float[] yvalues;    


//Variable para JSON
JSONObject json;

void setup(){
  //Tamano de la ventana
  size(1000, 666);
  
  w = width + 16;
  for (int i = 0; i < maxwaves; i++) {
    json = loadJSONObject("http://localhost:8080/actualData");
    BPMValue = json.getInt("frecuencia");
    amplitude[i] = (BPMValue*0.5)-30;;
    println(amplitude[i]);
    float period = random(100,300); // How many pixels before the wave repeats
    println("PERIODO "+period);
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new float[w/xspacing];
  
  //Cargando imagenes a las variables
  temperature = loadImage("termometro.png");
  calories = loadImage("llama.png");
}

void draw(){
  background(190, 209, 216); //Color de fondo //Grisaceo celestoso xd
  
  getData();
  
  frames();
  

  labelText();
  drawTemperature();
  drawCalories();
  addImages();
 
  calcWave();
  renderWave();
}

void getData(){
  int currentSecond = second();
  boolean consultar = false;
  
  if(currentSecond != lastSecond){
    tiempoConsulta = tiempoConsulta + 1;
    if(tiempoConsulta == 5){
      tiempoConsulta = 0;
      consultar = true;
    }
  }
  
  lastSecond = currentSecond;
  
  if(consultar){
    //Consumo de Api
    json = loadJSONObject("http://localhost:8080/actualData");
    
    tempValue = json.getFloat("temperatura"); //Obtiene los valores de temperatura corporal
    
    amplitude[0] = amplitude[1];
    amplitude[1] = amplitude[2];
    amplitude[2] = amplitude[3];
    BPMValue = json.getFloat("frecuencia"); //Obtiene los valores de Frecuencia cardiaca
    amplitude[3] = (BPMValue*0.5)-30;
    println("num: 1"+" Val: "+(amplitude[0]*2+30));
    println("num: 2"+" Val: "+(amplitude[1]*2+30));
    println("num: 3"+" Val: "+(amplitude[2]*2+30));
    println("num: 4"+" Val: "+(amplitude[3]*2+30));
    
    calValue = json.getFloat("calorias"); //Obtiene los valores de calorias quemadas
  }
}

void frames(){
  fill(255,255,255); //color de los retangulos Blanco
  
  //Retangulos para separar la informacion
  rect(150,50,300,200,25);
  rect(545,50,300,200,25);
  rect(150,300,700,350,25);
  fill(216, 227, 226);
  rect(150,400,700,200);
}

void addImages(){ 
  image(temperature,300,100); //Imagene de temperatura
  image(calories,715,137); //Imagene de temperatura
}

void labelText(){
  //Temperatura
  textSize(18); //Tamaño del texto
  fill(255,255,255); //Color del texto Blanco
  text(labelTemperature, 165, 40); //Muestra texto en pantalla
  
  
  textSize(50); //Tamaño de texto
  fill(0,0,0); //Color del texto negro
  text(tempValue+"°C", 170, 100); //Imprimir texto en pantalla
  
  //Calorias
  textSize(18); //Tamaño del texto
  fill(255,255,255); //Color del texto Blanco
  text(labelCalories, 560, 40); //Muestra texto en pantalla
  
  
  textSize(50); //Tamaño de texto
  fill(0,0,0); //Color del texto negro
  text(calValue+"Cal", 560, 100); //Muestra texto en pantalla
  
  //Frecuencia cardiaca
  textSize(18); //Tamaño del texto
  fill(255,255,255); //Color del texto Blanco
  text(labelBPM, 165, 290); //Muestra texto en pantalla
  
  
  textSize(50); //Tamaño de texto
  fill(0,0,0); //Color del texto negro
  text(BPMValue+"BPM", 170, 360); //Muestra texto en pantalla

}

void drawTemperature(){
  //Color Temperatura
  //Conversion para la temperatura donde maximo sea 36ºC y mínimo 15ºC
                  //Valor,Min,Max,Rango para devolver el valor
  float temp = map (tempValue, 15,36, 0, 255);
  red = temp;
  //conversion para el cambio de color.
  green = temp * -1 + 255;
  blue = temp * -1 + 255;
  
  //Dibujamos un retangulo y una esfera para colorear la temperatura
  noStroke(); //Les quita el borde a las figuras
  fill(red,green,blue);
  rect(352.5,110,5,85,500);
  ellipseMode(CENTER);
  ellipse(355,201,26,26);
}

void drawCalories(){
  //Color Temperatura
  //Conversion para la temperatura donde maximo sea 36ºC y mínimo 15ºC
                  //Valor,Min,Max,Rango para devolver el valor
  float temp = map (tempValue, 15,36, 0, 255);
  red = temp;
  //conversion para el cambio de color.
  green = temp * -1 + 255;
  blue = temp * -1 + 255;
  
  //Dibujamos un retangulo y una esfera para colorear la temperatura
  noStroke(); //Les quita el borde a las figuras
  ellipseMode(CENTER);
  fill(247, 172, 11);
  arc(750,170,130,130, 0, PI*(calValue*0.0009)); 
  
  fill(255);
  ellipse(750,170,80,80);
}

void calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.1;

  // Set all height values to zero
  for (int i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }
 
  // Accumulate wave height values
  for (int j = 0; j < maxwaves; j++) {
    float x = theta;
    for (int i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 == 0)  yvalues[i] += sin(x)*amplitude[j];
      else yvalues[i] += cos(x)*amplitude[j];
      x+=dx[j];
    }
  }
}

void renderWave() {
  // A simple way to draw the wave with an ellipse at each location
  noStroke();
  fill(0);
  ellipseMode(CENTER);
  for (int x = 0; x < yvalues.length; x++) {
    ellipse((x*xspacing)*0.69+150,(height/2+yvalues[x])+180,6,6);
  }
}
