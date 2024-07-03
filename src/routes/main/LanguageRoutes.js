import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LanguageLearner from "../../pages/LanguageLearner/LanguageLearner";
import LanguagePhrases from "../../pages/LanguageLearner/LanguagePhrases";
import LanguageSelected from "../../pages/LanguageLearner/LanguageSelected";

const LanguageStack = createStackNavigator();

const LanguageStackNavigator = () => {
  return (
    <LanguageStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: true }}
    >
      <LanguageStack.Screen name="LLearner" component={LanguageLearner} />
      <LanguageStack.Screen name="LPhrases" component={LanguagePhrases} />
      <LanguageStack.Screen name="LSelected" component={LanguageSelected} />
    </LanguageStack.Navigator>
  );
};

export default LanguageStackNavigator;
