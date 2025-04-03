#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include "DHT.h"
#include "env.h"

const int dhtPin = 2;

DHT dht(dhtPin, DHT11);

void setup() {
  dht.begin();
  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected");
}

void loop() {
  delay(5000);
  Serial.println(WIFI_SSID);
  displayTemperatureAndHumidity();
  
  String macAddress = WiFi.macAddress();
  Serial.println(macAddress);

  updateUserLocation();
  Serial.println("I'm awake, but I'm going into deep sleep mode for 10 seconds");
  ESP.deepSleep(10e6);   
}

void updateUserLocation()
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

    StaticJsonDocument<200> doc;
    doc["temperature"] = dht.readTemperature();
    doc["humidity"] = dht.readHumidity();
    // doc["api_key"] = institution_api_key;
    // doc["institution_id"] = institution_id;
    // doc["entry_time"] = getISOTime();

    String jsonString;
    serializeJson(doc, jsonString);

    //String postData = "{\"mac_address\":" + WiFi.macAddress() + "}"; 
    String url = "/update_food_bin_details";

    client.print(String("POST ") + url + " HTTP/1.1\r\n" +
                 "Host: " + SERVER + "\r\n" +
                 "Content-Type: application/json\r\n" +
    //              "x-api-key:" + apiKey + "\r\n" +
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


void displayTemperatureAndHumidity() {
  Serial.println("Temperature in C:");  
  Serial.println((dht.readTemperature()));  
  Serial.println("Humidity in C:");  
  Serial.println((dht.readHumidity()));  
}
