import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SubscribedTopicsContext } from "../src/SubscribedTopicsContext";
import { TopicMessagesContext } from "../src/TopicMessagesContext";
import { style_Text, style_continer, styles_card } from "./styles";

var { height } = Dimensions.get("window");
var box_count = 3;
var box_height = height / box_count;

const SubTopic = ({ route }) => {
  //const [topic, setTopic] = useState("");
  const { mqttCon } = route.params;
  const { subscribedTopics, setSubscribedTopics } = useContext(
    SubscribedTopicsContext
  );
  //const { topicMessages, setTopicMessages } = useContext(TopicMessagesContext);
  //setTopicMessages(mqttCon.getTopicMessages);
  const [inputValue, setInputValue] = useState("");
  let messageLstLocal = [];
  let key = 0;

  //mqttCon.subscribe(topic);

  const handleSubscribe = () => {
    mqttCon.subscribe(inputValue);
    console.log(`Subscribed to ${inputValue}`);
    // Add subscribed topic to the list
    setSubscribedTopics([...subscribedTopics, inputValue]);
    setInputValue("");
  };
  const handleUnsubscribe = (topic) => {
    mqttCon.unsubscribe({ topic });
    console.log(`Unsubscribed from ${topic}`);
    setSubscribedTopics(subscribedTopics.filter((item) => item !== topic));
  };

  return (
    <KeyboardAvoidingView behavior='height' style={style_continer.container}>
      <View style={[style_continer.container]}>
        <View style={style_continer.box1A}>
          <Text style={style_Text.Title}>Subscribe to MQTT Topic</Text>
        </View>
        <View style={style_continer.box2}>
          <View style={[styles_card.card, styles_card.elevation]}>
            <TextInput
              style={style_Text.inputText}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder='Topic Name'
            />
            <Pressable style={style_Text.button}>
              <Text style={style_Text.btnText} onPress={handleSubscribe}>
                Suscribe
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={style_continer.box3}>
          <Text key={key} style={style_Text.subt}>
            Topics Subscribed List
          </Text>
          {subscribedTopics.map((topic) => (
            <Pressable key={key + 1} style={style_Text.button2}>
              <Text style={style_Text.btnText}>{topic}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SubTopic;
