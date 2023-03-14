import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Screens
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import Dashboard from "./screens/Dashboard";
import MQTT_Pub from "./screens/MQTT_Pub";
import SubTopic from "./screens/SubTopic";

const Tab = createBottomTabNavigator();

const SettingsStackNavigator = createNativeStackNavigator();

function SettingStack() {
  return (
    <SettingsStackNavigator.Navigator initialRouteName='Settings Configuration'>
      <SettingsStackNavigator.Screen
        name='Settings Configuration'
        component={SettingScreen}
      />
      <SettingsStackNavigator.Screen
        name='Subscribe Topic Section'
        component={SubTopic}
      />
    </SettingsStackNavigator.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: "Feed",
          headerShown: false,
          tabBarActiveBackgroundColor: "green",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          headerShown: false,
          tabBarActiveBackgroundColor: "green",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='chart-areaspline'
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Settings'
        component={SettingStack}
        options={{
          tabBarLabel: "Settings MQTT",
          headerShown: false,
          tabBarActiveBackgroundColor: "green",
          tabBarActiveTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='router-wireless-settings'
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
