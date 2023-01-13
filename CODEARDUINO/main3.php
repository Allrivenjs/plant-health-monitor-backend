#include <ArduinoJson.h>  // Importa la librería ArduinoJson para poder trabajar con objetos JSON

// Direcciones I2C de cada sensor
#define LIGHT_SENSOR_ADDRESS 0x23  // Dirección del sensor de luz
#define TEMP_SENSOR_ADDRESS 0x48  // Dirección del sensor de temperatura
#define HUM_SENSOR_ADDRESS 0x27  // Dirección del sensor de humedad

// Pines de cada sensor
#define LIGHT_SENSOR_PIN A0  // Pin del sensor de luz
#define TEMP_SENSOR_PIN A1  // Pin del sensor de temperatura
#define HUM_SENSOR_PIN A2  // Pin del sensor de humedad

// Variables para almacenar los valores leídos por cada sensor
int lightValue;
float tempValue;
float humValue;

// Crea un objeto JSON para almacenar los datos de los sensores
DynamicJsonDocument jsonDoc(1024);

void getDataToJson() {
  // Lee y almacena el valor del sensor de luz
  lightValue = analogRead(LIGHT_SENSOR_PIN);

  // Lee y almacena el valor del sensor de temperatura
  Wire.beginTransmission(TEMP_SENSOR_ADDRESS);  // Inicia la transmisión con el sensor de temperatura
  Wire.write(0x00);  // Dirección del registro del sensor de temperatura
  Wire.endTransmission();  // Finaliza la transmisión
  Wire.requestFrom(TEMP_SENSOR_ADDRESS, 2)
  // Convierte los bytes en la humedad en porcentaje
  humValue = ((humMSB << 8) | humLSB) * 0.00190735 - 6;

  // Almacena los valores leídos por cada sensor en el objeto JSON
  jsonDoc["luz"] = lightValue;
  jsonDoc["temperatura"] = tempValue;
  jsonDoc["humedad"] = humValue;
}

void setup() {
  Serial.begin(9600);  // Inicializa la comunicación serial a 9600 baudios
  Wire.begin();  // Inicializa el bus I2C
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

