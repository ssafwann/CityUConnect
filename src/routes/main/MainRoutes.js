import React, { useContext } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "../../config/Firebase.js";
import HomePage from "../../pages/HomePage.js";
import ProfilePage from "../../pages/ProfilePage.js";
import ForumRoutes from "./ForumRoutes.js";
import TabBar from "../../components/TabBar.js";
import { AuthContext } from "../../config/AuthContext.js";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function HomeTabs() {
  const { user } = useContext(AuthContext);

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
      // tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Index"
        component={HomePage}
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
