import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../config/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const userId = user.uid;

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
        const userDocRef = doc(db, "users", userId);
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
  }, [userId]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const storage = getStorage();
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setProfile({ ...profile, profilePic: downloadURL });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const saveProfile = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        profilePic: profile.profilePic,
        hobbies: profile.hobbies.split(",").map((hobby) => hobby.trim()),
        age: profile.age,
        country: profile.country,
        major: profile.major,
        bio: profile.bio,
        phone: profile.phone,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // edit profile content
  if (isEditing) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["right", "top", "left"]}>
        <CustomKeyboardView>
          <StatusBar style="dark" />
          <View
            className="flex-1 gap-5"
            style={{
              paddingTop: hp(2),
              paddingHorizontal: wp(5),
              paddingBottom: 20,
            }}
          >
            {/* image */}
            <View className="gap-4 items-center">
              <Image
                source={{
                  uri: profile.profilePic || "https://i.imgur.com/An9lt8E.png",
                }}
                style={{ width: 120, height: 120, borderRadius: 100 }}
              />
              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-indigo-500"
                >
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>

            {/* personal info */}
            <View className="gap-5">
              {/* Bio */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Bio
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="bio"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, bio: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your bio"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    defaultValue={profile.bio}
                  />
                </View>
              </View>
              {/* Phone */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Phone
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, phone: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your phone number"
                    placeholderTextColor={"black"}
                    keyboardType="numeric"
                    defaultValue={profile.phone}
                  />
                </View>
              </View>
              {/* age */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Age
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="numeric-1-box-outline"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, age: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your age"
                    placeholderTextColor={"black"}
                    keyboardType="numeric"
                    defaultValue={profile.age}
                  />
                </View>
              </View>
              {/* hobbies */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Hobbies
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="bicycle"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, hobbies: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your hobbies (comma seperated)"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    defaultValue={profile.hobbies}
                  />
                </View>
              </View>
              {/* major */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Major
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="school-outline"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, major: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your major"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    defaultValue={profile.major}
                  />
                </View>
              </View>
              {/* country */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4 }}
                  className="font-bold"
                >
                  Home Country
                </Text>
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-xl"
                >
                  <MaterialCommunityIcons
                    name="home-city-outline"
                    size={hp(2.7)}
                    color="#bf165e"
                  />
                  <TextInput
                    onChangeText={(text) =>
                      setProfile({ ...profile, country: text })
                    }
                    style={{ fontSize: 16 }}
                    className="text-neutral-800"
                    placeholder="Enter your home country"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    defaultValue={profile.country}
                  />
                </View>
              </View>
            </View>

            {/* buttons */}
            <View className="gap-4">
              <TouchableOpacity
                style={styles.saveProfileButton}
                onPress={saveProfile}
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-white font-bold tracking-wider"
                >
                  Save Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                }}
              >
                <Text
                  style={{ fontSize: hp(2), color: "#fff" }}
                  className="font-bold tracking-wider"
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomKeyboardView>
      </SafeAreaView>
    );
  }

  // default page
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View
          className="flex-1 gap-5"
          style={{ paddingTop: hp(3), paddingHorizontal: wp(5) }}
        >
          <View className="items-center">
            <Image
              source={{
                uri:
                  profile.profilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR4AZs5P7rx9946kPKaDYaK77tmp3foVCWDA&s",
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
              <Pressable
                onPress={() => {
                  setIsEditing(true);
                }}
              >
                <Text className="text-neutral-400">Edit Profile</Text>
              </Pressable>
            </View>
            {/* items */}
            <View className="gap-2">
              {/* email */}
              <View>
                <View
                  style={{ height: hp(7), paddingHorizontal: 18 }}
                  className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                >
                  <View className="flex-row items-center" style={{ gap: 10 }}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={hp(2.7)}
                      color="#bf165e"
                    />
                    <Text className="text-neutral-500" style={{ fontSize: 16 }}>
                      Email
                    </Text>
                  </View>
                  <Text>{profile.email}</Text>
                </View>
              </View>
              {/* phone no */}
              <View>
                <View
                  style={{ height: hp(7), paddingHorizontal: 18 }}
                  className="flex-row gap-4 bg-neutral-200 items-center rounded-xl justify-between"
                >
                  <View className="flex-row items-center" style={{ gap: 10 }}>
                    <MaterialCommunityIcons
                      name="phone-outline"
                      size={hp(2.7)}
                      color="#bf165e"
                    />
                    <Text className="text-neutral-500" style={{ fontSize: 16 }}>
                      Phone
                    </Text>
                  </View>
                  <Text>{profile.phone}</Text>
                </View>
              </View>
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
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveProfileButton: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
  },
});

export default ProfilePage;
