// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import Home from "./screens/Home";
import SearchVideo from "./screens/SearchVideo";
import VideoStreaming from "./screens/VideoStreaming";
import VideoWatching from "./screens/VideoWatching";
import CreateVideoUploadVideo from "./screens/CreateVideoUploadVideo";
import CreateVideoSelectFilter from "./screens/CreateVideoSelectFilter";
import CreateVideoSelectMusic from "./screens/CreateVideoSelectMusic";
import CreateVideoPostVideo from "./screens/CreateVideoPostVideo";
import MyProfile from "./screens/MyProfile";
import Follow from "./screens/Follow";
import ProfileDetails from "./screens/ProfileDetails"; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmptyScreen() {
  return <View style={{ flex: 1, backgroundColor: "#000" }} />;
}

function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FF4081",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Search") iconName = "search-outline";
          else if (route.name === "Create") iconName = "add-circle-outline";
          else if (route.name === "Friends") iconName = "people-outline";
          else if (route.name === "My Profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchVideo} />
      <Tab.Screen
        name="Create"
        component={EmptyScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.plusButton}
              onPress={() => navigation.navigate("CreateVideoUploadVideo")}
            >
              <Ionicons name="add" size={34} color="#FF4081" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Friends" component={Follow} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="VideoStreaming" component={VideoStreaming} />
        <Stack.Screen name="VideoWatching" component={VideoWatching} />
        <Stack.Screen
          name="CreateVideoUploadVideo"
          component={CreateVideoUploadVideo}
        />
        <Stack.Screen
          name="CreateVideoSelectFilter"
          component={CreateVideoSelectFilter}
        />
        <Stack.Screen
          name="CreateVideoSelectMusic"
          component={CreateVideoSelectMusic}
        />
        <Stack.Screen
          name="CreateVideoPostVideo"
          component={CreateVideoPostVideo}
        />
        <Stack.Screen name="Follow" component={Follow} />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "#FF4081",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 25,
  },
});



