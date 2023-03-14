# IoT_Project_2BIM
Project to create a app using react native expo that allows to connect with MQTT mosquitto broker.

How to install React Native App

1. Download repository.
2. Move to project folder.
3. Execute in terminal: ```npm install```
4. Execute in terminal: ```npm start``` or ```expo start```

Change mosquitto.conf file withe follow code:
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
