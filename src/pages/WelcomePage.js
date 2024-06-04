import React from "react";
import { View, SafeAreaView } from "react-native";
import CustomText from "../components/CustomText";

const Welcome = () => {
  return (
    <SafeAreaView>
      <View className="bg-red-400 p-8 margin">
        <CustomText>Welcome Page</CustomText>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
