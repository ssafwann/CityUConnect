import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, AntDesign } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "react-native";

const OthersProfilePage = ({ route, navigation }) => {
  const { postAuthorId } = route.params;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    hobbies: "",
    major: "",
    profilePic: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", postAuthorId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            age: userData.age || "",
            country: userData.country || "",
            hobbies: userData.hobbies ? userData.hobbies.join(", ") : "",
            major: userData.major || "",
            profilePic: userData.profilePic || "",
            bio: userData.bio || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [postAuthorId]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: hp(3), paddingHorizontal: wp(5) }}
      edges={["right", "top", "left"]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingBottom: hp(3),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          User Profile
        </Text>
      </View>
      <CustomKeyboardView>
        <ScrollView style={{ flex: 1 }}>
          <View className="flex-1 gap-5">
            <View className="items-center">
              <Image
                source={{
                  uri: profile.profilePic || "https://i.imgur.com/An9lt8E.png",
                }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
              />
            </View>

            {/* name and bio */}
            <View className="gap-3 items-center">
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold text-neutral-800  text-center"
              >
                {profile.name}
              </Text>
              <Text
                style={{ fontSize: hp(1.75) }}
                className="text-neutral-800 text-center"
              >
                {profile.bio === ""
                  ? "Add a bio for others to introduce yourself!"
                  : profile.bio}
              </Text>
            </View>

            {/* Personal Info */}
            <View className="gap-5">
              {/* heading */}
              <View className="justify-between flex-row items-center">
                <Text style="font-extrabold" className="text-neutral-500">
                  Personal Info
                </Text>
              </View>
              {/* items */}
              <View className="gap-2">
                {/* phone no */}
                {profile.phone && (
                  <View>
                    <View
                      style={{ height: hp(7), paddingHorizontal: 18 }}
                      className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                    >
                      <View
                        className="flex-row items-center"
                        style={{ gap: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="phone-outline"
                          size={hp(2.7)}
                          color="#bf165e"
                        />
                        <Text
                          className="text-neutral-500"
                          style={{ fontSize: 16 }}
                        >
                          Phone
                        </Text>
                      </View>
                      <Text>{profile.phone}</Text>
                    </View>
                  </View>
                )}
                {/* age */}
                {profile.age && (
                  <View>
                    <View
                      style={{ height: hp(7), paddingHorizontal: 18 }}
                      className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                    >
                      <View
                        className="flex-row items-center justify-between"
                        style={{ gap: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="numeric-1-box-outline"
                          size={hp(2.7)}
                          color="#bf165e"
                        />
                        <Text
                          className="text-neutral-500"
                          style={{ fontSize: 16 }}
                        >
                          Age
                        </Text>
                      </View>
                      <Text>{profile.age}</Text>
                    </View>
                  </View>
                )}
                {/* Hobbies */}
                {profile.hobbies && (
                  <View>
                    <View
                      style={{ height: hp(7), paddingHorizontal: 18 }}
                      className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                    >
                      <View
                        className="flex-row items-center justify-between"
                        style={{ gap: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="bicycle"
                          size={hp(2.7)}
                          color="#bf165e"
                        />
                        <Text
                          className="text-neutral-500"
                          style={{ fontSize: 16 }}
                        >
                          Hobbies
                        </Text>
                      </View>
                      <Text>{profile.hobbies}</Text>
                    </View>
                  </View>
                )}
                {/* Major */}
                {profile.major && (
                  <View>
                    <View
                      style={{ height: hp(7), paddingHorizontal: 18 }}
                      className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                    >
                      <View
                        className="flex-row items-center justify-between"
                        style={{ gap: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="school"
                          size={hp(2.7)}
                          color="#bf165e"
                        />
                        <Text
                          className="text-neutral-500"
                          style={{ fontSize: 16 }}
                        >
                          Major
                        </Text>
                      </View>
                      <Text>{profile.major}</Text>
                    </View>
                  </View>
                )}
                {/* Country */}
                {profile.country && (
                  <View>
                    <View
                      style={{ height: hp(7), paddingHorizontal: 18 }}
                      className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                    >
                      <View
                        className="flex-row items-center justify-between"
                        style={{ gap: 10 }}
                      >
                        <MaterialCommunityIcons
                          name="home-city-outline"
                          size={hp(2.7)}
                          color="#bf165e"
                        />
                        <Text
                          className="text-neutral-500"
                          style={{ fontSize: 16 }}
                        >
                          Home Country
                        </Text>
                      </View>
                      <Text>{profile.country}</Text>
                    </View>
                  </View>
                )}
              </View>
              {profile.phone && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    var message =
                      "Hello! I wanted to connect with you. I found you on CityUConnect!"; // The default message
                    const url = `https://api.whatsapp.com/send?phone=${profile.phone}&text=${message}`;

                    Linking.openURL(url).catch((err) =>
                      console.error("An error occurred", err)
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="whatsapp"
                    size={24}
                    color="white"
                  />
                  <Text
                    style={{ fontSize: hp(2), color: "#fff" }}
                    className="font-bold tracking-wider"
                  >
                    Whatsapp
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "#25d366",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
    marginTop: 10,
    marginBottom: 30,
    flexDirection: "row",
    gap: 8,
  },
});

export default OthersProfilePage;
