import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestBG from "../../assets/images/restbg.jpg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const FoodMapSelected = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const openMaps = () => {
    const destination = `${restaurant.latitude},${restaurant.longitude}`;
    const provider = Platform.OS === "ios" ? "apple" : "google";
    const link =
      provider === "google"
        ? `https://www.google.com/maps/dir/?api=1&destination=${destination}`
        : `http://maps.apple.com/?daddr=${destination}`;

    Linking.openURL(link).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "top", "left"]}>
      {/* top header */}
      <View style={styles.container}>
        <ImageBackground
          source={RestBG}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* background tint */}
          <View style={styles.tintOverlay} />

          {/* header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              top: hp(2.5),
              left: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                marginLeft: 20,
                color: "#fff",
              }}
            >
              Shop Details
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* resaturant details */}
      <View
        className="bg-white mx-4 my-6"
        style={{ paddingHorizontal: 28, paddingVertical: 15, borderRadius: 10 }}
      >
        {/* name + categories */}
        <View className="pt-4 gap-2">
          <Text
            style={{
              fontSize: hp(2.7),
              color: "black",
              fontWeight: "bold",
            }}
          >
            {restaurant.name}
          </Text>

          <View className="flex-row gap-3 flex-wrap">
            {restaurant.category.map((ctg) => (
              <View style={styles.catItem} key={ctg}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: hp(1.4),
                    fontWeight: "600",
                  }}
                >
                  {ctg}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* address */}
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.data}>{restaurant.address}</Text>
        </View>

        {/* region*/}
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Region:</Text>
          <Text style={styles.data}>{restaurant.region}</Text>
        </View>

        {/* price range*/}
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Price Range:</Text>
          <Text style={styles.data}>{restaurant.priceRange}</Text>
        </View>

        {/* price average  */}
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Average Price:</Text>
          <Text style={styles.data}>Around ${restaurant.priceAvg}</Text>
        </View>

        {/* likes and dislikes */}
        <View className="flex-row items-start pt-6 gap-4 pb-3">
          <View className="flex-row gap-1 items-center">
            <AntDesign name="like1" size={24} color="green" />
            <Text style={{ fontSize: hp(2), fontWeight: "500" }}>
              {restaurant.likes}
            </Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <AntDesign name="dislike1" size={24} color="red" />
            <Text style={{ fontSize: hp(2), fontWeight: "500" }}>
              {" "}
              {restaurant.dislikes}
            </Text>
          </View>
        </View>
      </View>

      <View className="pt-2 px-7">
        <TouchableOpacity style={styles.button} onPress={openMaps}>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-white font-bold tracking-wider"
          >
            Get Directions
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(8),
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 28,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(191, 22, 94, 0.9)",
  },
  catItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#bf165e",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderColor: "#bf165e",
    borderWidth: 1,
  },
  addressContainer: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
  },
  data: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
  },
});

export default FoodMapSelected;
