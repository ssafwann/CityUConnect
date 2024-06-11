import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../config/AuthContext";
import { Button } from "react-native";
import { auth } from "../config/Firebase";

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.name}!</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Phone: {user?.phone}</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          auth.signOut();
        }}
      />
    </View>
  );
}
