#include <ArduinoJson.h>
#include <DHT.h>



// Definir el pin ADC que estás utilizando para conectar la celda fotovoltaica
#define LIGHT_SENSOR_PIN 34 // ESP32 pin GIOP36 (ADC0)
#define SENSOR_HEMEDAD_CAPACITIVO 25

#define PinRele 32
#define DHTTYPE DHT11
#define DHTPIN 26 

WiFiClient clientW;
HTTPClient http;
WiFiClientSecure client;

const String serverAddress = "https://plant-health-monitor-backend-production.up.railway.app";  //"192.168.1.82"
const char*  fingerprint = "14 8B 97 9B 8D 33 14 33 C6 9A 4A CA 24 AD AA B9 8F 74 3A F2";



// Variables para almacenar los valores leídos por cada sensor
int lightValue;
float tempValue, humValue;
String mac;


DynamicJsonDocument jsonDoc(4024);
DHT dht(DHTPIN, DHTTYPE);

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


 
void setup() {

  wifiSetup();
  InitHttp();

  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
  pinMode(PinRele, OUTPUT);


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
   int sensor_analog  = analogRead(SENSOR_HEMEDAD_CAPACITIVO);
   int humedad = ( 100 - ( (sensor_analog/4095.00) * 100 ) );
   Serial.print ("Humedad suelo = ");
   Serial.println (humedad);
   delay (500);
}

void active_rele(){
  delay(1000);
  digitalWrite(PinRele, HIGH);
  delay(2000);
  digitalWrite(PinRele, LOW);
}

void loop() {
  Fotoresistor();
  sensorDHT();
  sensorHumedad();
  active_rele();
  delay (1000);




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
