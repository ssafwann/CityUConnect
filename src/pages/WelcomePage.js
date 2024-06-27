import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Welcome = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>welcome page</Text>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,
//     backgroundColor: "#bf165e",
//   },
//   touchableOpacity: {
//     paddingTop: 12,
//     paddingBottom: 12,
//     backgroundColor: "#FACC15",
//     marginLeft: 28,
//     marginRight: 28,
//     borderRadius: 12,
//   },
//   touchableText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "gray",
//   },
// });

export default Welcome;
