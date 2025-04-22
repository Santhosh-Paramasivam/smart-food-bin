#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include "DHT.h"
#include "HX711.h"
#include "env.h"

const int dhtPin = 2;
const int LOADCELL_DOUT_PIN = 12;
const int LOADCELL_SCK_PIN = 13;

DHT dht(dhtPin, DHT11);
HX711 scale;

void setup() {
  dht.begin();
  Serial.begin(9600);  

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  
  uint32_t hasTaredFlag = 0;

  // Read the hasTared flag from RTC memory
  if (!ESP.rtcUserMemoryRead(0, &hasTaredFlag, sizeof(hasTaredFlag))) {
    Serial.println("Failed to read RTC memory");
  }

  if (hasTaredFlag != 1) {
    scale.set_scale();    
    Serial.println("Tare... remove any weights from the scale.");
    delay(4000);
    scale.tare(); // Perform taring only if not done before
    hasTaredFlag = 1;
    if (!ESP.rtcUserMemoryWrite(0, &hasTaredFlag, sizeof(hasTaredFlag))) {
      Serial.println("Failed to write to RTC memory");
    }
  }

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected");
}

void loop() {
  // delay(5000);
  Serial.println(WIFI_SSID);
  displayTemperatureAndHumidity();
  
  String macAddress = WiFi.macAddress();
  Serial.println(macAddress);

  sendBinStatus();
  Serial.println("I'm awake, but I'm going into deep sleep mode for 10 seconds");
  ESP.deepSleep(10e6);   
}

void sendBinStatus()
{
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected to WiFi");

    WiFiClientSecure client;
    // Serial.println(WiFi.macAddress());
    client.setInsecure();

    if (!client.connect(SERVER, 443)) {
      Serial.println("Connection to server failed");
      delay(1000);
      return;
    }

    double weight = getWeight();
    Serial.println("Weight : ");
    Serial.println(weight);

    StaticJsonDocument<200> doc;
    doc["foodbin-id"] = 1;
    doc["temperature"] = dht.readTemperature();
    doc["humidity"] = dht.readHumidity();
    doc["weight"] = weight;

    String jsonString;
    serializeJson(doc, jsonString);

    String url = "/update_food_bin_details";

    client.print(String("POST ") + url + " HTTP/1.1\r\n" +
                 "Host: " + SERVER + "\r\n" +
                 "Content-Type: application/json\r\n" +
                 "Content-Length: " + jsonString.length() + "\r\n" +
                 "Connection: close\r\n\r\n" +
                 jsonString);

    while (client.connected()) {
     String line = client.readStringUntil('\n');
     if (line == "\r") {
       break;
     }
    }

    String response = client.readString();

    //if (response.indexOf("200 OK") != -1) {
    //  Serial.println("Data sent successfully");
    //} else {
     Serial.println("Error sending data");
     Serial.println("Full server response: ");
     Serial.println(response);
    //}

    client.stop();
  }
  else {
    while (WiFi.begin(WIFI_SSID, WIFI_PASSWORD) != WL_CONNECTED) {
      delay(1000);
      Serial.println("Reconnecting to WiFi...");
    }
  }
}

double getWeight() {
    while (!scale.is_ready()) {
      Serial.println("HX711 not ready at this point");
      delay(1000);
    }
    
    long scaleReading = scale.get_units(10);
    
    Serial.print("scale reading : ");
    Serial.println(scaleReading);
    
    double weight = (scaleReading * -1) / 100.5751;

    return weight;
}

void displayTemperatureAndHumidity() {
  Serial.println("Temperature in C:");  
  Serial.println((dht.readTemperature()));  
  Serial.println("Humidity in C:");  
  Serial.println((dht.readHumidity()));  
}
