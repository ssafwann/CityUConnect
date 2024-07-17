import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FoodMap from "../../pages/FoodMap/FoodMap";
import FoodMapData from "../../pages/FoodMap/FoodMapData";
import FoodMapSelected from "../../pages/FoodMap/FoodMapSelected";

const FoodMapStack = createStackNavigator();

const FoodMapStackNavigator = () => {
  return (
    <FoodMapStack.Navigator screenOptions={{ headerShown: false }}>
      <FoodMapStack.Screen name="FMap" component={FoodMap} />
      <FoodMapStack.Screen name="FoodMapData" component={FoodMapData} />
      <FoodMapStack.Screen name="FoodMapSelected" component={FoodMapSelected} />
    </FoodMapStack.Navigator>
  );
};

export default FoodMapStackNavigator;
