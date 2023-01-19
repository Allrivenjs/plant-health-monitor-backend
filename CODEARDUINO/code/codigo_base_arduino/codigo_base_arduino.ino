#include <Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <strings_en.h>
#include <wm_consts_en.h>
#include <wm_strings_en.h>
#include <ArduinoJson.h>  // Importa la librería ArduinoJson para poder trabajar con objetos JSON
#include <DHT.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_ADS1X15.h>

// Pines de cada sensor
#define LIGHT_SENSOR_PIN 15  // Pin del sensor de luz
#define DHTPIN D5  // Pin del sensor de temperatura
#define HUMEDAD_PIN 12  // Pin del sensor de temperatura
#define HUM_SENSOR_PIN A2  // Pin del sensor de humedad

// Variables para almacenar los valores leídos por cada sensor
int lightValue;
float tempValue;
float humValue;


#define DHTTYPE DHT22
DynamicJsonDocument jsonDoc(4024);

const String serverAddress = "https://plant-health-monitor-backend-production.up.railway.app";  //"192.168.1.82"
const char*  fingerprint = "14 8B 97 9B 8D 33 14 33 C6 9A 4A CA 24 AD AA B9 8F 74 3A F2";
WiFiClient clientW;
HTTPClient http;
DHT dht(DHTPIN, DHTTYPE);
WiFiClientSecure client;
Adafruit_ADS1115 ads;

int16_t adc0, adc1, adc2, adc3;
String mac;

void wifiSetup(){
  //Creamos una instancia de la clase WifiManager
  WiFiManager wifiManager;

  wifiManager.autoConnect("WIFI_ES8266");
  Serial.println(WiFi.localIP());
  Serial.println(WiFi.macAddress());
  mac = WiFi.macAddress();
  Serial.println("Ya estas conectado");
  
}


void InitHttp(){
  String fullRequest = serverAddress + "/test";
  client.connect(fullRequest, 3000);
  if(client.setFingerprint(fingerprint)){
      http.begin(client, fullRequest);
      int httpCode = http.GET();
        if (httpCode > 0) {
      // Si la solicitud fue exitosa, leer la respuesta del servidor
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);
    } else {
      // Si la solicitud no fue exitosa, mostrar un mensaje de error
      Serial.println("Error al hacer la solicitud GET");
      Serial.println("Request failed: " + http.errorToString(httpCode));
      
    }
  }else 
      {
        Serial.println("certificate doesn't match");
      }
 }

 void getDhtDataSensor(){
    // put your main code here, to run repeatedly:
  tempValue = dht.readTemperature();
  humValue = dht.readHumidity();

  jsonDoc["temperatura"].add(tempValue);
  jsonDoc["humedad"].add(humValue);

  // // Imprime la lectura en la consola
  // Serial.print("Temperatura: ");
  // Serial.print(tempValue);
  // Serial.println(" grados Celsius");

  // Serial.print("Humedad: ");
  // Serial.print(humValue);
  // Serial.println(" %");

}
void getSensorLuzData(){
  int lightValue = adc0;
  // Serial.print("Valor en bruto luz: ");
  // Serial.print(SensorValue2);
  // // delay(100);
  // Serial.print("Valor e porcentaje de luz: ");
  lightValue = map(lightValue, 0, 1024, -10, 100);
  lightValue = constrain(lightValue, -10, 100);
  jsonDoc["luz"].add(lightValue);
  // Serial.print(lightValue); Serial.print("%");
  // delay(100);
}

void getHumedadSensor(){
  float hum = map(analogRead(A0), 803, 370, 0, 100); 
  jsonDoc["humedadSensor"].add(hum);
  // Serial.println(hum);
}

// function to calculate humidity from the raw sensor value
float calculateHumidity(int sensorValue) {
  // conversion formula: humidity = (sensorValue / 1023) * 100
  float humidity = (sensorValue / 1023.0) * 100;

  // return the calculated humidity value
  return humidity;
}


void getDataToJson() {
  getDhtDataSensor();
  getSensorLuzData();
  getHumedadSensor();
}


void setup() {
  Wire.begin(D4, D3);
  Serial.begin(115200);
  wifiSetup();
  InitHttp();
  pinMode(DHTPIN, INPUT);
  dht.begin();
 // Iniciar el ADS1115
  // ads.setGain(GAIN_ONE);
  ads.begin();

}

void loop() {
  // Ejecuta la función getDataToJson() cada segundo
  adc0 = ads.readADC_SingleEnded(0);
  adc1 = ads.readADC_SingleEnded(1);
  adc2 = ads.readADC_SingleEnded(2);
  adc3 = ads.readADC_SingleEnded(3);

  getDataToJson();

  // Serial.print("A0: "); 
  // Serial.println(adc0);
  // Serial.print("A1: "); 
  // Serial.println(adc1);
  // Serial.print("A2: "); 
  // Serial.println(adc2);
  // Serial.print("A3: "); 
  // Serial.println(adc3);
  // serializeJson(jsonDoc, Serial);
  // Serial.println("");


  delay(1000);

  // Ejecuta otra operación cada minuto
  static unsigned long lastMinute = millis();
  if (millis() - lastMinute >= 60000) {
    // Tu código aquí...
    lastMinute = millis();
    String url =  serverAddress + "/api/v1/device/data";
    http.begin(client, url);
    String jsonString;
    serializeJson(jsonDoc, jsonString);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-MAC", mac);
    int httpCode = http.POST(jsonString);
    if (httpCode > 0) {
        // Si la solicitud fue exitosa, leer la respuesta del servidor
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);
        jsonDoc.clear();

      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error
        Serial.println("Error al hacer la solicitud GET");
        Serial.println("Request failed: " + http.errorToString(httpCode));
      }
  }


}
