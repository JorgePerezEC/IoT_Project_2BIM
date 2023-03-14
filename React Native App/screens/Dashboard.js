import React, { useState, useEffect } from "react";
import PahoMQTT, { Client } from "paho-mqtt";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  FlatList,
  ListText,
  ScrollView,
} from "react-native";
import { style_Text } from "./styles";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

const Dashboard = () => {
  //const [server, setServer] = useState("");
  //const [port, setPort] = useState(9001);
  const [connected, setConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [mqttCon, setMqttCon] = useState();

  const [client, setClient] = useState(null);
  const [topicMessagesLista, setTopicMessagesLista] = useState([]);
  const topicMessagesLst = [];
  //
  class MQTTConnection {
    constructor() {
      this.direccionBroker = "192.168.93.93";
      this.puerto = 9001;
      this.client = null;
      this.onMQTTConnect = null;
      this.onMQTTLost = null;
    }

    onConnectionLost = (responseObject) => {
      console.log(
        "Conexión perdida con el broker MQTT: " + responseObject.errorMessage
      );
      if (this.onMQTTLost) {
        this.onMQTTLost();
      }
    };

    connect = () => {
      const host = this.direccionBroker;
      const port = this.puerto;
      const clientId = `mqtt_${Math.random().toString(16).slice(2, 8)}`;
      const timeout = 3;

      this.client = new PahoMQTT.Client(`${host}`, Number(port), clientId);
      this.client.onConnectionLost = this.onConnectionLost;

      this.client.onMessageArrived = (message) => {
        topicMessagesLst.push({
          topic: message.destinationName,
          mensaje: message.payloadString,
        });

        console.log(
          `Mensaje recibido en el topic ${message.destinationName}: ${message.payloadString}`
        );
        //console.log(topicMessagesLst);

        const newMessage = {
          topic: message.destinationName,
          mensaje: message.payloadString,
        };
        setTopicMessagesLista((prevMessages) => [...prevMessages, newMessage]);
      };

      this.client.connect({
        onSuccess: () => {
          console.log("Conectado al broker MQTT");
          if (this.onMQTTConnect) {
            this.onMQTTConnect();
          }
        },
        onFailure: (error) => {
          console.log(
            "Server: " + this.direccionBroker + " Puerto: " + this.puerto
          );

          console.log(`Error en la conexión con el broker MQTT: ${error}`);
          console.log(error);
        },
        timeout: timeout,
      });
    };

    disconnect = () => {
      if (this.client) {
        this.client.disconnect();
      }
    };

    subscribe = (topic, qos = 0) => {
      if (this.client) {
        console.log("Suscrito");
        this.client.subscribe(topic, { qos: qos });
      }
    };

    unsubscribe = (topic) => {
      if (this.client) {
        this.client.unsubscribe(topic);
      }
    };
    getClient = () => {
      return this.client;
    };
    getTopicMessages = () => {
      return this.topicMessagesLst;
    };
    getClientTopicsSub = () => {
      const subscribedTopics = this.client.topics;
      console.log(
        `El cliente está suscrito a los siguientes tópicos: ${subscribedTopics}`
      );
      return subscribedTopics;
    };

    publish = (topic, payload, qos = 0, retain = false) => {
      if (this.client && this.client.isConnected()) {
        const message = new PahoMQTT.Message(payload);
        message.destinationName = topic;
        message.qos = qos;
        message.retained = retain;
        this.client.send(message);
      } else {
        console.log("La conexión con el broker MQTT no está establecida.");
      }
    };
  }
  //
  const checkConnection = () => {
    const mqttConnection = new MQTTConnection();
    setClient(mqttConnection.client);
    setMqttCon(mqttConnection);

    mqttConnection.onMQTTConnect = () => {
      console.log("Conexión exitosa al servidor MQTT.");
      console.log("Lista mensajes: " + mqttConnection.getTopicMessages);
      setConnected(true);
      mqttConnection.subscribe("Planta/DHT11/Temperatura");
      mqttConnection.subscribe("Planta/DHT11/Humedad");
      mqttConnection.subscribe("Planta/BombaAgua");
      mqttConnection.subscribe("Planta/Ultra/Distancia");
      mqttConnection.subscribe("Planta/Higro/Humedad");
      mqttConnection.publish("Planta/DHT11/Temperatura", "App Mobile Suscrito");
      mqttConnection.publish("Planta/DHT11/Humedad", "App Mobile Suscrito");
      mqttConnection.publish("Planta/BombaAgua", "App Mobile Suscrito");
      mqttConnection.publish("Planta/Ultra/Distancia", "App Mobile Suscrito");
      mqttConnection.publish("Planta/Higro/Humedad", "App Mobile Suscrito");

      setConnectionStatus("Successfuly Connection to MQTT BROKER");
    };

    mqttConnection.onMQTTLost = () => {
      console.log("Conexión rechazada al servidor MQTT.");
      setConnected(false);
      setConnectionStatus("Connection Refused to MQTT BROKER");
    };

    mqttConnection.connect();
  };

  const handleConnectButtonPress = () => {
    checkConnection();
  };
  const handlePublishButtonPress = () => {
    const mqttConnection = new MQTTConnection();
    //mqttConnection.connect();
    mqttCon.publish("Planta/BombaAgua", "RegarPlanta");
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
          margin: -20,
        },
      ]}
    >
      <View
        style={{
          flex: 0.0,
          backgroundColor: "darkgreen",
          height: 100,
          marginTop: 35,
        }}
      >
        <Text style={style_Text.TitleDash}>DASHBOARD</Text>
      </View>
      {connected ? (
        <View style={{ flex: 0.0, backgroundColor: "white" }}>
          <Text style={style_btn.text2}>{connectionStatus}</Text>
          <Pressable
            style={style_btn.button2}
            onPress={handlePublishButtonPress}
          >
            <Text style={style_btn.text}>Regar Planta</Text>
          </Pressable>
          <View style={{ flex: 0.0, backgroundColor: "red", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: "left",
                fontWeight: "bold",
                color: "white",
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                paddingLeft: 5,
              }}
            >
              TOPICO
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MENSAJE
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 0.0, backgroundColor: "darkorange" }}>
          <Pressable
            style={style_btn.button}
            onPress={handleConnectButtonPress}
          >
            <Text style={style_btn.text}>Connect to MQTT BROKER</Text>
          </Pressable>
        </View>
      )}

      <ScrollView>
        <View style={{ flex: 3, backgroundColor: "white" }}>
          <FlatList
            data={topicMessagesLista}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                  {item.topic}:&nbsp;&nbsp; &nbsp;
                </Text>
                <Text style={styles.listItemTextMessage}>{item.mensaje}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  listItemText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "blue",
  },
  listItemTextMessage: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    backgroundColor: "yellow",
  },
});

const style_btn = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    margin: 20,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text2: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
  },
});

export default Dashboard;
