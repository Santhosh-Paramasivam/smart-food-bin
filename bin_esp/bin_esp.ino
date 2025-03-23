#include "DHT.h"

DHT dht(2, DHT11);
void setup() {
  dht.begin();
  Serial.begin(9600);
}

void loop() {
  Serial.println("Temperature in C:");  
  Serial.println((dht.readTemperature()));  
  Serial.println("Humidity in C:");  
  Serial.println((dht.readHumidity()));  
  delay(1000);  
}
