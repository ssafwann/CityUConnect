import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";

const LanguageLearner = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "top", "left"]}>
      <CustomKeyboardView>
        <ScrollView>
          <Text>LanguageLearner</Text>
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

export default LanguageLearner;
