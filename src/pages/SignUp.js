import React, { useRef } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons, Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../components/CustomKeyboardView";

const SignUp = ({ navigation }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const fullnameRef = useRef("");
  const phoneNoRef = useRef("");

  const register = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;
    const fullname = fullnameRef.current;
    const phoneNo = phoneNoRef.current;

    if (!email || !password || !fullname || !phoneNo) {
      Alert.alert("Sign Up", "Please fill in all the fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Sign Up", "Password must be at least 8 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        userID: user.uid,
        email: user.email,
        phone: phoneNo,
        name: fullname,
      });

      Alert.alert("Sign Up", "Your account has been created successfully.");
      auth.signOut(); // ! Firebase automatically signs in the user after registration
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert(
            "Error",
            "The email address is already in use by another account."
          );
          break;
        case "auth/invalid-email":
          Alert.alert("Error", "The email address is not valid.");
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
        className="flex-1 gap-10"
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/register.png")}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (fullnameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Full Name"
                placeholderTextColor={"gray"}
              />
            </View>
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
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
            >
              <Feather name="phone" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (phoneNoRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Phone Number"
                placeholderTextColor={"gray"}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.buttonTouch} onPress={register}>
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-white font-bold tracking-wider"
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account?{" "}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  buttonTouch: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
  },
});

export default SignUp;
