import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/Firebase.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

const FoodMapData = ({ route, navigation }) => {
  const { selectedCategories } = route.params;

  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      fetchRestaurants();
    })();
  }, []);

  const fetchRestaurants = async () => {
    const restaurantsRef = collection(db, "foodmap");
    const q = query(
      restaurantsRef,
      where("category", "array-contains-any", selectedCategories)
    );

    const querySnapshot = await getDocs(q);

    const restaurantsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };
    });

    setRestaurants(restaurantsData);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Getting your location and loading map. Please Wait!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: hp(3) }}
      edges={["right", "top", "left"]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingBottom: hp(3),
          paddingHorizontal: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Restaurants and Shops
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0025,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={false}
        >
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
            >
              <View>
                <Image
                  source={require("../../assets/images/marker.png")}
                  style={{ width: 45, height: 45 }}
                  resizeMode="contain"
                />
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.title}>{restaurant.name}</Text>
                  <Text style={styles.description}>{restaurant.address}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FoodMapSelected", {
                        restaurant: restaurant,
                      })
                    }
                  >
                    <Text className="text-blue-600 font-semibold underline">
                      More Details!
                    </Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: wp("60%"),
    padding: 0,
    gap: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: hp(2),
  },
  description: {
    marginBottom: 5,
  },
  distance: {
    color: "gray",
  },
});

export default FoodMapData;
