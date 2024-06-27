import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { AuthContext } from "../config/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Welcome, {user?.name}!</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Phone: {user?.phone}</Text>
      {/* <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate("Profile", {
            userId: "2RXdLelgWiWR81kRKGxzKkQ2YA72",
          })
        }
      /> */}
    </SafeAreaView>
  );
};

export default HomePage;
