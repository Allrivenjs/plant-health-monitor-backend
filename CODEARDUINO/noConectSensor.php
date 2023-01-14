#define HUM_SENSOR_ADDRESS 0x27  // Dirección del sensor de humedad

void setup() {
  Wire.begin();  // Inicializa el bus I2C
}

void loop() {
  Wire.beginTransmission(HUM_SENSOR_ADDRESS);  // Inicia la transmisión con el sensor de humedad
  Wire.write(0x00);  // Dirección del registro del sensor de humedad
  Wire.endTransmission();  // Finaliza la transmisión
  int bytesReceived = Wire.requestFrom(HUM_SENSOR_ADDRESS, 2);  // Solicita 2 bytes de datos del sensor de humedad

  if (bytesReceived > 0) {
    // El sensor de humedad está conectado y ha respondido a la solicitud de datos
    int humMSB = Wire.read();  // Almacena el byte más significativo de la humedad
    int humLSB = Wire.read();  // Almacena el byte menos significativo de la humedad
  } else {
    // El sensor de humedad no está conectado o no ha respondido a la solicitud de datos
  }
}

