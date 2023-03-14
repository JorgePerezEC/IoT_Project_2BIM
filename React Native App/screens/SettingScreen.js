import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MQTTConnection, topicMessagesLst } from "../src/MQTTconnection";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

const SettingScreen = () => {
  const navigation = useNavigation();

  const [server, setServer] = useState("");
  const [port, setPort] = useState(9001);
  const [connected, setConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [mqttCon, setMqttCon] = useState();

  const [client, setClient] = useState(null);

  const checkConnection = (server, puerto) => {
    const mqttConnection = new MQTTConnection(server, puerto);
    setClient(mqttConnection.client);
    setMqttCon(mqttConnection);
    //mqttClient = mqttConnection;
    //console.log("Server: "+server + " Puerto: "+puerto);

    mqttConnection.onMQTTConnect = () => {
      console.log("Conexión exitosa al servidor MQTT.");
      console.log("Lista mensajes: " + mqttConnection.getTopicMessages);
      setConnected(true);

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
    checkConnection(server, port);
  };
  const handleNewConnectionPress = () => {
    setConnected(false);
  };

  return (
    <SafeAreaView style={style_continer.container}>
      <View title='Header' style={style_continer.box1}>
        <Text
          style={{
            textAlign: "center",
            marginTop: "25%",
            fontSize: 40,
            backgroundColor: "darkgreen",
            color: "white",
          }}
        >
          MQTT Broker Configuration
        </Text>
      </View>
      <View style={style_continer.box2}>
        <TextInput
          style={styles.input}
          value={server}
          onChangeText={setServer}
          placeholder='Dirección IP del servidor MQTT'
          keyboardType='phone-pad'
          editable={!connected}
        />
        <Pressable style={style_btn.button} onPress={handleConnectButtonPress}>
          <Text style={style_btn.text}>Connect to MQTT BROKER</Text>
        </Pressable>
      </View>

      <View style={style_continer.box3}>
        {connected ? (
          <View>
            <Text style={style_btn.text2}>{connectionStatus}</Text>
            <Pressable
              style={style_btn.button2}
              onPress={() =>
                navigation.navigate("Subscribe Topic Section", {
                  mqttCon: mqttCon,
                })
              }
            >
              <Text style={style_btn.text}>Subsribe to Topic</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={{ color: "red" }}></Text>
        )}
      </View>
      <View>
        {connected ? (
          <Button title='New Connection' onPress={handleNewConnectionPress} />
        ) : (
          <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
};

//Style
const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
});

const style_continer = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: Platform.OS === "android" ? -105 : 0,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: box_height,
  },
  box1: {
    flex: 3,
    backgroundColor: "white",
  },
  box2: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
  },
  box3: {
    flex: 3,
    justifyContent: "flex-start",
    backgroundColor: "white",
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
    backgroundColor: "blue",
    margin: 20,
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
export default SettingScreen;
