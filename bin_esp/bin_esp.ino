#include "DHT.h"

const int dhtPin = 2;

DHT dht(dhtPin, DHT11);

void setup() {
  // dht.begin();
  Serial.begin(9600);
}

void loop() {
  // Serial.println("Temperature in C:");  
  // Serial.println((dht.readTemperature()));  
  // Serial.println("Humidity in C:");  
  // Serial.println((dht.readHumidity()));  
  delay(1000);
  Serial.println("I'm awake, but I'm going into deep sleep mode for 10 seconds");
  ESP.deepSleep(10e6);   
}
