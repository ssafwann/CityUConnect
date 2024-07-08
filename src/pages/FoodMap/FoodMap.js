import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const categoriesData = [
  "All Day Breakfast",
  "All-you-can-eat",
  "American",
  "Bakery",
  "Bar",
  "BBQ",
  "BBQ Ground",
  "Beijing",
  "British",
  "Buffet",
  "Cake",
  "Casual Drink",
  "Chicken Hot Pot",
  "Chiu Chow",
  "Chinese BBQ",
  "Chinese Buns",
  "Chinese Cake",
  "Coffee Shop",
  "Congee",
  "Cooked Food Center",
  "Curry",
  "Dai Pai Dong",
  "Dessert",
  "Dim Sum",
  "Dim Sum Restaurant",
  "Drivers Friendly Dining",
  "Fast Food",
  "Fine Dried Seafood",
  "Food Stall Noodles",
  "Food Wise Eateries",
  "French",
  "German",
  "Guangdong",
  "Hakka",
  "Hamburgers",
  "Herbal Cuisine",
  "Herbal Tea",
  "Hong Kong Style",
  "Hot Pot",
  "Ice Cream/Yogurt",
  "Indian",
  "International",
  "Izakaya",
  "Japanese",
  "Korean",
  "Malaysian",
  "Meatless Menu",
  "Mexican",
  "Noodles/Rice Noodles",
  "Outdoor",
  "Pizza",
  "Private Kitchen",
  "Ramen",
  "Robatayaki",
  "Roast Meat",
  "Salad",
  "Seafood",
  "Seafood Restaurant",
  "Shanghai",
  "Sichuan",
  "Singaporean",
  "Skewer",
  "Snack Shop & Deli",
  "Soup",
  "Special Occasion Dining",
  "Steak House",
  "Stir-Fry",
  "Sushi Bar",
  "Sushi/Sashimi",
  "Sweet Soup",
  "Taiwanese Drink",
  "Taiwan",
  "Takeaway",
  "Tea Restaurant",
  "Teppanyaki",
  "Thai",
  "Turkish",
  "Udon",
  "Upper-floor Cafe",
  "Vegetarian",
  "Village Food",
  "Vietnamese",
  "Western",
  "Western Restaurant",
  "Wine/Cigar",
  "Wonton/Dumpling",
  "Yunnan",
];

const FoodMap = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
    setFilteredCategories(
      categoriesData.filter((category) =>
        category.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setSearch("");
    setFilteredCategories(categoriesData);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      Alert.alert("Food Map", "You must select at least one category.");
    } else {
      // console.log("Selected Categories:", selectedCategories);
      navigation.navigate("FoodMapData", { selectedCategories });
    }
  };

  const renderCategoryItem = ({ item, index, length }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategories.includes(item) && styles.selectedCategoryItem,
        length > 1 && index !== length - 1 && styles.categoryItemBorder,
      ]}
      onPress={() => toggleCategory(item)}
    >
      <Text style={{ fontSize: hp(1.9) }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: hp(2) }}
      edges={["right", "top", "left"]}
    >
      {/* Header */}
      <View style={{ alignItems: "center", gap: 5 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Food Map
        </Text>
        <Text
          className="font-semibold text-neutral-500"
          style={{ fontSize: hp(1.7) }}
        >
          Select categories that match your preferences
        </Text>
      </View>

      {/* container that includes the searh bar + list */}
      <View style={styles.container}>
        {/* Search Bar + icon*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Ionicons
            name="search"
            color="#c2c3c8"
            size={20}
            style={{ padding: 10 }}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search and select categories..."
            onChangeText={updateSearch}
            value={search}
          />
        </View>

        {/* selected categories */}
        <View
          style={
            selectedCategories.length > 0
              ? styles.selectedCategoriesContainer
              : {}
          }
        >
          {selectedCategories.map((category) => (
            <View key={category} style={styles.selectedCategoryContainer}>
              <Text style={styles.selectedCategoryText}>{category}</Text>
              <TouchableOpacity onPress={() => handleDeleteCategory(category)}>
                <Text style={{ color: "#96989f", fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* list with all categories */}
        <FlatList
          data={filteredCategories}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) =>
            renderCategoryItem({
              item,
              index,
              length: filteredCategories.length,
            })
          }
        />

        {/* submit button */}
        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-white font-bold tracking-wider"
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  searchBar: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 10,
  },
  selectedCategoriesContainer: {
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  selectedCategoryContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#dde2e7",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  selectedCategoryText: {
    fontSize: hp(1.5),
    fontWeight: "400",
  },
  categoryItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  categoryItem: {
    padding: 15,
    backgroundColor: "#fff",
  },
  selectedCategoryItem: {
    backgroundColor: "#d9d9d9",
  },
  button: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
  },
});

export default FoodMap;
