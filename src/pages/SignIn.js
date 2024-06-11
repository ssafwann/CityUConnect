import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import CustomKeyboardView from "../components/CustomKeyboardView";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";

const SignIn = ({ navigation }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const login = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email || !password) {
      Alert.alert("Sign In", "Please fill in all the fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          Alert.alert("Error", "The provided login credential is invalid.");
          break;
        default:
          Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            style={{ height: hp(30) }}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  minLength={6}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-400"
              >
                Forgot password?
              </Text>
            </View>

            <TouchableOpacity style={styles.buttonTouch} onPress={login}>
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-white font-bold tracking-wider"
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?{" "}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

styles = {
  buttonTouch: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
  },
};

export default SignIn;
