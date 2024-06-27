import React, { useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { AuthContext } from "../config/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../components/CustomKeyboardView";
import HeaderBG from "../assets/images/cityu-bg.jpg"; // Step 2: Import your local image
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const HomePage = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }} edges={["right", "top", "left"]}>
      {/* top header */}
      <View style={styles.container}>
        <ImageBackground
          source={HeaderBG} // Make sure HeaderBG is correctly imported
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.tintOverlay} />

          <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        </ImageBackground>
      </View>

      <CustomKeyboardView>
        <ScrollView>
          {/* all other stuff */}
          <View
            style={{
              flex: 1,
              paddingTop: hp(4),
              paddingHorizontal: wp(5),
              gap: 20,
              marginBottom: 20,
            }}
          >
            {/* forum */}
            <Pressable
              className="bg-white flex-col py-7 px-4 gap-6"
              // style={({pressed}) => [{opacity: pressed ? 'darkgreen' : 'green'}]}
              style={{ borderRadius: 10 }}
              onPress={() => navigation.navigate("Forum")}
            >
              {/* image icon */}
              <View
                style={{
                  backgroundColor: "#f0fdfa",
                  padding: 8,
                  width: 28 + 16,
                  height: 28 + 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="forum-outline"
                  size={24}
                  color={"green"}
                />
              </View>
              {/* details */}
              <View className="flex-col gap-2">
                <Text
                  className="text-black font-bold"
                  style={{ fontSize: hp(2.25) }}
                >
                  Forum
                </Text>
                <Text
                  style={{ color: "#9FA4AC" }}
                  className="font-semibold leading-5"
                >
                  Connect, share, and discuss with other students on our vibrant
                  and engaging forum community.
                </Text>
              </View>
            </Pressable>
            {/* language learner */}
            <Pressable
              className="bg-white flex-col py-7 px-4 gap-6"
              style={{ borderRadius: 10 }}
              onPress={() => navigation.navigate("LLearner")}
            >
              {/* image icon */}
              <View
                style={{
                  backgroundColor: "#faf5ff",
                  padding: 8,
                  width: 28 + 16,
                  height: 28 + 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="chat"
                  size={24}
                  color={"purple"}
                />
              </View>
              {/* details */}
              <View className="flex-col gap-2">
                <Text
                  className="text-black font-bold"
                  style={{ fontSize: hp(2.25) }}
                >
                  Language Learner
                </Text>
                <Text
                  style={{ color: "#9FA4AC" }}
                  className="font-semibold leading-5"
                >
                  Discover essential Cantonese phrases and words effortlessly
                  with our beginner-friendly language learning feature.
                </Text>
              </View>
            </Pressable>
            {/* food map */}
            <Pressable
              className="bg-white flex-col py-7 px-4 gap-6"
              style={{ borderRadius: 10 }}
              onPress={() => navigation.navigate("FoodMap")}
            >
              {/* image icon */}
              <View
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: 8,
                  width: 28 + 16,
                  height: 28 + 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={24}
                  color={"#4f97bf"}
                />
              </View>
              {/* details */}
              <View className="flex-col gap-2">
                <Text
                  className="text-black font-bold"
                  style={{ fontSize: hp(2.25) }}
                >
                  Food Map
                </Text>
                <Text
                  style={{ color: "#9FA4AC" }}
                  className="font-semibold leading-5"
                >
                  Navigate your culinary exploration with our interactive food
                  map feature, finding the perfect restaurants tailored to your
                  preferences.
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 175,
    overflow: "hidden", // Ensures the borderRadius is applied to the background image
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end", // Aligns the welcome text to the bottom
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay cover the entire parent
    backgroundColor: "rgba(191, 22, 94, 0.9)", // Using #bf165e with 80% opacity for a darker tint
  },
  welcomeText: {
    fontSize: hp(2.5),
    color: "white",
    marginBottom: 10, // Adjusts the space from the bottom edge
    paddingLeft: 10,
    fontWeight: "bold",
  },
});

export default HomePage;
