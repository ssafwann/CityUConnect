import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../config/AuthContext";

import AuthRoutes from "./auth/AuthRoutes";
import MainRoutes from "./main/MainRoutes";

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <MainRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default AppNavigator;
