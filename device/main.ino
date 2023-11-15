#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <Servo.h>

#define thump 13
#define index 5
#define middle 4
#define ring 0
#define pinky 14

Servo thump_servo;
Servo index_servo;
Servo middle_servo;
Servo ring_servo;
Servo pinky_servo;

bool isReset = false;

short angle1 = 0;
short angle2 = 180;

const size_t capacity = JSON_OBJECT_SIZE(100);
StaticJsonDocument<capacity> doc;
bool dataReceived = false;

const char *ssid = "";
const char *password = "";

ESP8266WebServer server(80);

int stringToInt(String str)
{
  if (str == "0")
    return 0;
  if (str == "1")
    return 1;
  if (str == "2")
    return 2;
  if (str == "3")
    return 3;
  if (str == "4")
    return 4;
  if (str == "5")
    return 5;
  if (str == "6")
    return 6;
  return 0;
}

void handlePredict()
{
  String predictionContent = server.arg("plain");
  Serial.println("Prediction data: " + predictionContent);

  DeserializationError error = deserializeJson(doc, predictionContent);

  if (error)
  {
    Serial.print(F("Failed to parse JSON: "));
    Serial.println(error.c_str());
    return;
  }

  dataReceived = true;
  isReset = false;
  server.send(200, "text/plain", "Data received");
}

void handleReset()
{
  isReset = true;
  move_hand(0);
  server.send(200, "text/plain", "Arm reset");
}

void handleMove()
{
  isReset = true;
  String move = server.arg("plain");
  move_hand(stringToInt(move));
  server.send(200, "text/plain", "Hand moved successfully");
}

void setup()
{
  Serial.begin(115200);
  move_hand(0);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.print("Connected to WiFi. IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/predict", HTTP_POST, handlePredict);
  server.on("/reset", HTTP_PUT, handleReset);
  server.on("/move", HTTP_PUT, handleMove);

  // Print the server's IP address
  Serial.print("Server IP address: ");
  Serial.println(WiFi.gatewayIP());

  server.enableCORS(true);
  server.begin();

  thump_servo.attach(thump);
  middle_servo.attach(middle);
  index_servo.attach(index);
  ring_servo.attach(ring);
  pinky_servo.attach(pinky);
}

void move_finger(short f1, short f2, short f3, short f4, short f5)
{
  pinky_servo.write(f1);
  delay(100);
  ring_servo.write(f2);
  delay(100);
  middle_servo.write(f3);
  delay(100);
  index_servo.write(f4);
  delay(100);
  thump_servo.write(f5);
}

void move_hand(int m)
{
  Serial.println("The arm is moving: ");
  Serial.print(m);
  switch (m)
  {
  case 0:
    move_finger(angle2, angle1, angle1, angle2, angle1);
    break;

  case 1:
    move_finger(angle2, angle2, angle2, angle2, angle2);
    break;

  case 2:
    move_finger(angle1, angle2, angle1, angle2, angle2);
    break;

  case 3:
    move_finger(angle2, angle1, angle1, angle1, angle2);
    break;

  case 4:
    move_finger(angle2, angle2, angle2, angle2, angle1);
    break;

  case 5:
    move_finger(angle2, angle2, angle2, angle1, angle1);
    break;
  case 6:
    move_finger(angle1, angle2, angle2, angle1, angle2);
    break;
  default:
    Serial.println("Wrong move number");
    break;
  }
}

void loop()
{
  server.handleClient();

  if (dataReceived)
  {
    JsonArray data = doc["data"].as<JsonArray>();
    int dataSize = data.size();

    for (int i = 0; i < dataSize; i++)
    {
      server.handleClient();
      if (isReset)
      {
        isReset = false;
        break;
      }

      int move = data[i];
      move_hand(move);

      if (data[i] != 0)
      {
        delay(5000);
      }
      else
      {
        if (i != 0 && i != dataSize - 1)
        {
          if (data[i - 1] != 0 && data[i + 1] != 0)
          {
            delay(3000);
          }
          else
          {
            delay(1000);
          }
        }
        else
        {
          delay(1000);
        }
      }
    }
    dataReceived = false;
    move_hand(0);
  }
}