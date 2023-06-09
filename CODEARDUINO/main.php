#include <Wire.h>  // Importa la librería Wire para poder usar el protocolo I2C

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

void setup() {
  Serial.begin(9600);  // Inicializa la comunicación serial a 9600 baudios
  Wire.begin();  // Inicializa el bus I2C
}

void loop() {
  // Lee y almacena el valor del sensor de luz
  lightValue = analogRead(LIGHT_SENSOR_PIN);

  // Lee y almacena el valor del sensor de temperatura
  Wire.beginTransmission(TEMP_SENSOR_ADDRESS);  // Inicia la transmisión con el sensor de temperatura
  Wire.write(0x00);  // Dirección del registro del sensor de temperatura
  Wire.endTransmission();  // Finaliza la transmisión
  Wire.requestFrom(TEMP_SENSOR_ADDRESS, 2);  // Solicita 2 bytes de datos del sensor de temperatura
  int tempMSB = Wire.read();  // Almacena el byte más significativo de la temperatura
  int tempLSB = Wire.read();  // Almacena el byte menos significativo de la temperatura
  tempValue = ((tempMSB << 8) | tempLSB) * 0.0625;  // Convierte los bytes en la temperatura en grados Celsius

  // Lee y almacena el valor del sensor de humedad
  Wire.beginTransmission(HUM_SENSOR_ADDRESS);  // Inicia la transmisión con el sensor de humedad
  Wire.write(0x00);  // Dirección del registro del sensor de humedad
  Wire.endTransmission();  // Finaliza la transmisión
  Wire.requestFrom(HUM_SENSOR_ADDRESS, 2);  // Solicita 2 bytes de datos del sensor de humedad
  int humMSB = Wire.read();  // Almacena el byte más significativo de la humedad
  int humLSB = Wire.read();  // Almacena el byte menos significativo de la humedad

  // Convierte los bytes en la humedad en porcentaje
  humValue = ((humMSB << 8) | humLSB) * 0.00190735 - 6;

  // Imprime los valores leídos por cada sensor
  Serial.print("Valor de luz: ");
  Serial.println(lightValue);
  Serial.print("Temperatura: ");
  Serial.println(tempValue);
  Serial.print("Humedad: ");
  Serial.println(humValue);

  delay(1000);  // Espera 1 segundo antes de leer de nuevo los sensores
}

