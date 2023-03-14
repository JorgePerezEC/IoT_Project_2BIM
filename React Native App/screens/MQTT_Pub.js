import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Pressable} from "react-native";
import { style_Text, style_continer, styles_card } from './styles';

const MQTT_Pub = () => {

  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  return (
    <KeyboardAvoidingView behavior="height" style={style_continer.container}>
    <View style={[style_continer.container]}>
        <View style={style_continer.box1}>
            <Text
                style={style_Text.Title}
                >
                Subsribe to MQTT Topic
            </Text>
        </View>
        <View style={style_continer.box2}>
            <View style={[styles_card.card, styles_card.elevation]}>
                <TextInput
                    style={style_Text.inputText}
                    value={setTopic}
                    onChangeText={setTopic}
                    placeholder='Topic Name' 
                />
                <TextInput
          style={styles.input}
          value={topic}
          onChangeText={setMessage}
          placeholder='Insert Message to publish'
        />
                <Pressable style={style_Text.button} >
                <Text style={style_Text.btnText}>Publish</Text>
                </Pressable>
            </View>
            
        </View>
        
      
    </View>

        
    </KeyboardAvoidingView>
  );
};

//Style
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default MQTT_Pub;
