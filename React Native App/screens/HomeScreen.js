import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";
import { style_Text, style_continer, styles_card } from "./styles";

const HomeScreen = () => {
  return (
    <KeyboardAvoidingView behavior='height' style={style_continer.container}>
      <View style={[style_continer.container]}>
        <View style={style_continer.box1}>
          <Text style={style_Text.Title}>MQTT APP</Text>
        </View>
        <View style={style_continer.box2}>
          <Image
            source={require("./img/logoEPN.png")}
            style={{
              flex: 0.5,
              resizeMode: "contain",
              justifyContent: "center",
              width: 200,
            }}
          />
          <Text style={styleTextHome.textTitle}>SISTEMAS IoT</Text>
          <Text style={styleTextHome.textTitle2}>
            Jorge Perez y Patricio Vaicilla
          </Text>
          <Text></Text>
          <Text></Text>
          <Text style={styleTextHome.textTitle2}>
            Aplicacion para controlar planta inteligente
          </Text>
        </View>
        <View></View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styleTextHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingLeft: 5,
  },
  textTitle2: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingLeft: 5,
  },
});

export default HomeScreen;
