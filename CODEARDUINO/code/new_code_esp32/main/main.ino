#include <ArduinoJson.h>
#include <DHT.h>



// Definir el pin ADC que estás utilizando para conectar la celda fotovoltaica
#define LIGHT_SENSOR_PIN 34 // ESP32 pin GIOP36 (ADC0)
#define SENSOR_HEMEDAD_CAPACITIVO 4


#define DHTTYPE DHT11
#define DHTPIN 26 


// Variables para almacenar los valores leídos por cada sensor
int lightValue;
float tempValue, humValue;



DynamicJsonDocument jsonDoc(4024);
DHT dht(DHTPIN, DHTTYPE);


void setup() {

  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();


}

void Fotoresistor(){
  int analogValue = analogRead(LIGHT_SENSOR_PIN); 
  lightValue = map(lightValue, 0, 4095, 0, 100);

  jsonDoc["luz"].add(lightValue);

  Serial.print("Analog Value = ");
  Serial.print(analogValue);   // the raw analog reading

  // We'll have a few threshholds, qualitatively determined
  if (analogValue < 40) {
    Serial.println(" => Dark");
  } else if (analogValue < 800) {
    Serial.println(" => Dim");
  } else if (analogValue < 2000) {
    Serial.println(" => Light");
  } else if (analogValue < 3200) {
    Serial.println(" => Bright");
  } else {
    Serial.println(" => Very bright");
  }

  delay(500); // Puedes ajustar este valor según sea necesario
}

void sensorDHT(){
   //Lee valores de temperatura y humedad
  float humedad = dht.readHumidity();
  float temperatura = dht.readTemperature();
  
  jsonDoc["humedadDHT"].add(humedad);
  jsonDoc["temperaturaDHT"].add(temperatura);
  //Mostrar valores leídos
  Serial.print ("Temperatura = ");
  Serial.print (temperatura);
  Serial.println (" ºC");
  Serial.print ("Humedad = ");
  Serial.print (humedad);
  Serial.println (" %");
  delay (500);

}

void sensorHumedad(){
   int humedad = analogRead(SENSOR_HEMEDAD_CAPACITIVO);
   Serial.print ("Humedad suelo = ");
   Serial.println (humedad);
   delay (500);
}


void loop() {
  Fotoresistor();
  sensorDHT();
  //sensorHumedad();
  delay (1000);
}
