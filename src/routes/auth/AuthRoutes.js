import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <>
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  </>
);

export default AuthRoutes;
