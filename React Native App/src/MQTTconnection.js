import PahoMQTT, { Client } from "paho-mqtt";

const topicMessagesLst = [];

class MQTTConnection {
  constructor(direccionBroker, puerto) {
    //super();
    this.direccionBroker = direccionBroker;
    this.puerto = puerto;
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
    const lista = ["1", "2"];
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
      console.log(topicMessagesLst);
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

export { MQTTConnection, topicMessagesLst };
//export default MQTTConnections;
