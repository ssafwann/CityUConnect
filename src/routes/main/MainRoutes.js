import React, { useContext } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../../config/Firebase.js";
import HomePage from "../../pages/HomePage.js";
import ProfilePage from "../../pages/ProfilePage.js";
import ForumRoutes from "./ForumRoutes.js";
import { AuthContext } from "../../config/AuthContext.js";
import FoodMapStack from "./FoodMapRoutes.js";
import LanguageStack from "./LanguageRoutes.js";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: true }}
    >
      <HomeStack.Screen name="HomePage" component={HomePage} />
      <HomeStack.Screen name="LanguagePage" component={LanguageStack} />
      <HomeStack.Screen name="FoodMap" component={FoodMapStack} />
    </HomeStack.Navigator>
  );
}

function HomeTabs() {
  const signOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          auth.signOut();
        },
      },
    ]);
  };

  return (
    <Tab.Navigator
      style={{ paddingBottom: 100, marginBottom: 100 }}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        tabBarStyle: [{ display: "flex" }, null],
        tabBarActiveTintColor: "#bf165e",
      }}
    >
      <Tab.Screen
        name="Index"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="forum-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SignOut"
        component={HomePage}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            signOut();
          },
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="sign-out" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const MainRoutes = () => (
  <>
    <MainStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <MainStack.Screen name="Home" component={HomeTabs} />
    </MainStack.Navigator>
  </>
);

export default MainRoutes;
