#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <strings_en.h>
#include <wm_consts_en.h>
#include <wm_strings_en.h>
#include <ArduinoJson.h>  // Importa la librería ArduinoJson para poder trabajar con objetos JSON
#include <DHT.h>
#include <ESP8266HTTPClient.h>

// Pines de cada sensor
#define LIGHT_SENSOR_PIN 15  // Pin del sensor de luz
#define DHTPIN 14  // Pin del sensor de temperatura
#define HUM_SENSOR_PIN A2  // Pin del sensor de humedad

// Variables para almacenar los valores leídos por cada sensor
int lightValue;
float tempValue;
float humValue;


#define DHTTYPE DHT22
DynamicJsonDocument jsonDoc(4024);

const char* serverAddress = "192.168.1.66";  //"192.168.1.82"
const int serverPort = 3002;
WiFiClient clientW;
HTTPClient http;
DHT dht(DHTPIN, DHTTYPE);

void wifiSetup(){
  //Creamos una instancia de la clase WifiManager
  WiFiManager wifiManager;

  wifiManager.autoConnect("WIFI_ES8266");
  Serial.println(WiFi.localIP());
  Serial.println(WiFi.macAddress());
  Serial.println("Ya estas conectado");
  
}


void InitHttp(){
  http.begin(clientW, serverAddress, serverPort);
  int httpCode = http.GET();
  if (httpCode > 0) {
    // Si la solicitud fue exitosa, leer la respuesta del servidor
    String payload = http.getString();
    Serial.println(httpCode);
    Serial.println(payload);
  } else {
    // Si la solicitud no fue exitosa, mostrar un mensaje de error
    Serial.println("Error al hacer la solicitud GET");
  }

  // Finalizar la solicitud HTTP
  // http.end();
}

 void getDhtDataSensor(){
    // put your main code here, to run repeatedly:
  tempValue = dht.readTemperature();
  humValue = dht.readHumidity();

  jsonDoc["temperatura"] = tempValue;
  jsonDoc["humedad"] = humValue;

  // // Imprime la lectura en la consola
  // Serial.print("Temperatura: ");
  // Serial.print(temperature);
  // Serial.println(" grados Celsius");

  // Serial.print("Humedad: ");
  // Serial.print(humidity);
  // Serial.println(" %");

}
void getSensorLuzData(){
  int lightValue = analogRead(LIGHT_SENSOR_PIN);
  // Serial.print("Valor en bruto luz: ");
  // Serial.print(SensorValue2);
  // // delay(100);
  // Serial.print("Valor e porcentaje de luz: ");
  lightValue = map(lightValue, 0, 1024, -10, 100);
  jsonDoc["luz"] = lightValue;
  // Serial.print(luz); Serial.print("%");
  // delay(100);
}

void getDataToJson() {
  getDhtDataSensor();
  getSensorLuzData();
}


void setup() {
  Serial.begin(115200);
  wifiSetup();
  InitHttp();
  dht.begin();
}

void loop() {
  // Ejecuta la función getDataToJson() cada segundo
  getDataToJson();
  delay(1000);

  // Ejecuta otra operación cada minuto
  static unsigned long lastMinute = millis();
  if (millis() - lastMinute >= 60000) {
    // Tu código aquí...
    lastMinute = millis();
  }


}
