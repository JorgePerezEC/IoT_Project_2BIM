# IoT_Project
Project to create an app using react native expo which allows to connect to mosquitto's MQTT broker and subscribe to broker topics where sensors connected to an ESP32 are publishing data.

How to install React Native App

1. Download repository.
2. Move to project folder.
3. Execute in terminal: ```npm install```
4. Execute in terminal: ```npm start``` or ```expo start```

Change mosquitto.conf file with follow code:
```
-----------------------
listener 1883 0.0.0.0
allow_anonymous true

listener 9001 127.0.0.1
protocol websockets
-----------------------
```
Then restart the service using the new file configuration

How to start Mosqitto Broker topics:
Execute in terminal:
```
mosquitto_sub -t Planta/DHT11/Temperatura
mosquitto_sub -t Planta/DHT11/Humedad
mosquitto_sub -t Planta/BombaAgua
mosquitto_sub -t Planta/Ultra/Distancia
mosquitto_sub -t Planta/Higro/Humedad
```
