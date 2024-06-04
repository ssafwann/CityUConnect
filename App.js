import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import AppNavigator from "./src/routes/AppNavigator";

const App = () => {
  // lightest to darkest
  const [fontsLoaded] = useFonts({
    NexaThin: require("./src/assets/fonts/NexaText-Thin.ttf"),
    NexaLight: require("./src/assets/fonts/NexaText-Light.ttf"),
    NexaExtraLight: require("./src/assets/fonts/NexaText-ExtraLight.ttf"),
    Nexa: require("./src/assets/fonts/NexaText-Regular.ttf"),
    NexaBold: require("./src/assets/fonts/NexaText-Bold.ttf"),
    NexaExtraBold: require("./src/assets/fonts/NexaText-ExtraBold.ttf"),
    NexaHeavy: require("./src/assets/fonts/NexaText-Heavy.ttf"),
    NexaBlack: require("./src/assets/fonts/NexaText-Black.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(SplashScreen.hideAsync, 3000); // splash screen will remain for 3 seconds
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return <AppNavigator />;
};

export default App;
