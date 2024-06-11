import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../../pages/HomePage.js";

const MainStack = createStackNavigator();

const MainRoutes = () => (
  <>
    <MainStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <MainStack.Screen name="Home" component={HomePage} />
    </MainStack.Navigator>
  </>
);

export default MainRoutes;
