const int BOMBA_PIN = 3;  // Pin de salida a la que está conectada la bomba de agua

void setup() {
  pinMode(BOMBA_PIN, OUTPUT);  // Configura el pin de salida para controlar la bomba de agua
}

void loop() {
  // Tu código aquí...
}

void activarBomba() {
  digitalWrite(BOMBA_PIN, HIGH);  // Activa la bomba de agua
  delay(10000);  // Espera 10 segundos
  digitalWrite(BOMBA_PIN, LOW);  // Desactiva la bomba de agua
}

