//Libreria requeridas para el funcionamiento del sistema
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

//Agregar el nombre de la red wifi en la cual se implementa el entorno
const char* ssid = "realmeGeorge"; 
//Ingresar la contraseña del wifi
const char* password = "12345678";
//Ingresar la direción Ip del servidor MQTT, direción de la computadora que esta ejecutando el servidor react
const char* mqtt_server = "192.168.93.93";
//Los siguientes son la definición de los topicos 
const char* humedad_topic = "Planta/DHT11/Humedad";
const char* temperatura_topic = "Planta/DHT11/Temperatura";
const char* humedad_topic2 = "Planta/Higro/Humedad";
const char* distancia_topic = "Planta/Ultra/Distancia";
const char* regar_topic = "Planta/BombaAgua";
//Definimos Variables
const int humedad_pin = 15;
const int temperatura_pin = 15;
const int trigger_pin = 14;
const int echo_pin = 4;
const int rele_pin = 27;
const int umbral_humedad = 50;
const int higrometerSensorPin = 2;

//Declaramos tres objetos necesarios
WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(temperatura_pin, DHT11);
//Función que establece coneción
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}
//Función que escucha un tópico en particular, en este caso el tópico Planta/BombaAgua
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  //coparamos el mensaje enviado y ejecutamos la senteia de activado, apgado, funcionamiento normal de la bomba
  if (strcmp(topic, regar_topic) == 0) {
    String msg = "";
    for (int i = 0; i < length; i++) {
      msg += (char)payload[i];
    }
    if (msg == "RegarPlanta") {
      digitalWrite(rele_pin, HIGH);
      Serial.println("Relé activado");
      client.publish(regar_topic, "Regando Planta");
    } else if (msg == "Desactivar") {
      digitalWrite(rele_pin, LOW);
      Serial.println("Relé desactivado");
      client.publish(regar_topic, "Detener Bomba");
    } else if (msg == "Normal") {
      Serial.println("Ejecución normal");
    }
  }
}

//La siguiente Función reconecta al dispositivo esp32 al servidor mqtt
void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando al servidor MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("conectado");
      client.subscribe(regar_topic);
    } else {
      Serial.print("falló, rc=");
      Serial.print(client.state());
      Serial.println(" intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}
//Codigo que se ejecuta una unica vez al inicio del programa
void setup() {
  Serial.begin(9600);

  pinMode(rele_pin, OUTPUT);
  pinMode(trigger_pin, OUTPUT);
  pinMode(echo_pin, INPUT);
  pinMode(higrometerSensorPin,INPUT);
  digitalWrite(rele_pin, LOW);
  digitalWrite(trigger_pin, LOW);
    setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  dht.begin();
}
//Codigo que se repide en cada ciclo del dispositivo.
void loop() {
  
  // Leer el valor digital del higrómetro, se escoge este valor, puesto la funcion wifi, genera medición incorrecta de entradas analogicas.
  int lectura2 = digitalRead(higrometerSensorPin);
  digitalWrite(27, LOW);
  // Imprimir el valor de humedad en el monitor serial
  Serial.print("Humedad: ");
  Serial.print(lectura2);
  Serial.println("%");
  //Si el valor medido corresponde a un uno logico, es porque la tierra esta seca, en caso distinto la tierra esta mojada.
   if ((int)lectura2 == 1) {
    Serial.print("msm: ");
    Serial.println("tierra seca");
    client.publish(humedad_topic2, "tierra seca");
    digitalWrite(rele_pin, HIGH);
    Serial.println("Relé activado");
    client.publish(regar_topic, "Regando Planta");
  }else{
    Serial.println("tierra mojada");
    client.publish(humedad_topic2, "Tierra mojada");
    Serial.println("Relé desactivado");
      client.publish(regar_topic, "Detener Bomba");
  }
  
  //medición del volumen del contenedor
  long t;   //tiempo que demora en llegar el eco
  float d;  //distancia en centimetros
  
  t = pulseIn(echo_pin, HIGH);  //obtenemos el ancho del pulso
  d = t / 59;               //escalamos el tiempo a una distancia en cm
  float vol = 830-(7.5*8.5*d);  //nivel de agua en ml o cm3 (Volumen del recipiente)
  Serial.println("distancia");
  Serial.println(d);

  //tiempo de 3 segundo para accionamiento de la bomba
  delay(3000);
  //nos aseguramos de que la bomba se apague
digitalWrite(rele_pin, LOW);
// verificamos conectividad
 if (!client.connected()) {
    reconnect();
  }
  client.loop();
  //Lectura del sensor dht11 variable humedad
  float humedad = dht.readHumidity();
  // Sentencias de control para enviar la información al topico Planta/DHT11/Humedad 
  if (!isnan(humedad)) {

    Serial.print("Humedad dht11: ");
    Serial.println(humedad);
    
      String hum= String(humedad,1) + "%";
      client.publish(humedad_topic, String(hum).c_str());
   // client.publish(temperatura_topic, tem.c_str());
  }
  //Lectura del sensor dht11 variable temperatura
  float temperatura = dht.readTemperature();
    // Sentencias de control para enviar la información al topico Planta/DHT11/Temperatura
  if (!isnan(temperatura)) {
    Serial.print("Temperatura: ");
    Serial.println(temperatura);
    String tem= String(temperatura,1) + "°C";
    client.publish(temperatura_topic, tem.c_str());
  }
  //Enviamos señal en ultrasonico, para posterior lectura
  digitalWrite(trigger_pin, HIGH);
  delayMicroseconds(10);  //Enviamos un pulso de 10us
  digitalWrite(trigger_pin, LOW);

  //imprimimos los valores del volumen del contenedor
    Serial.print("Vol: ");
    Serial.println(vol);
    Serial.print(" ml");
    String volu= String(vol,1) + " ml";
    client.publish(distancia_topic, String(volu).c_str());
}