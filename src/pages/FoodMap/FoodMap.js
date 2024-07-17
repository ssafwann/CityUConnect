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
  "Australian",
  "BBQ Ground",
  "BBQ",
  "Bakery",
  "Bar",
  "Beijing",
  "Belgian",
  "British",
  "Buffet",
  "Business Dining",
  "Cake",
  "Casual Drink",
  "Certified Halal Food",
  "Chicken Hot Pot",
  "Chinese BBQ",
  "Chinese Buns",
  "Chinese Cake",
  "Chiu Chow",
  "Chocolate/Candy Shop",
  "Club House",
  "Coffee Shop",
  "Congee",
  "Cooked Food Center",
  "Curry",
  "Dai Pai Dong",
  "Dessert",
  "Dim Sum Restaurant",
  "Dim Sum",
  "Drivers Friendly Dining",
  "Egyptian",
  "Family Style Dining",
  "Fast Food",
  "Fine Dining",
  "Fine Dried Seafood",
  "Food Court",
  "Food Stall Noodles",
  "Food Wise Eateries",
  "French",
  "Fujian",
  "German",
  "Group Dining",
  "Guangdong",
  "Guangxi",
  "Hakka",
  "Hamburger",
  "Herbal Cuisine",
  "Herbal Tea",
  "Hong Kong Style",
  "Hot Chili Oil",
  "Hot Pot",
  "Hotel Restaurant",
  "Hunan",
  "Ice Cream/yogurt",
  "Indian",
  "Indonesian",
  "Irish",
  "Italian",
  "Izakaya",
  "Japanese",
  "Jingchuanhu",
  "Korean Fried Chicken",
  "Korean",
  "Malaysian",
  "Meatless Menu",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nepalese",
  "Noodles/Rice Noodles",
  "Northeastern",
  "Organic Food",
  "Outdoor",
  "Oyster Bar",
  "Pets Friendly Dining",
  "Pizza",
  "Portuguese",
  "Private Kitchen",
  "Private Party",
  "Ramen",
  "Roast Meat",
  "Robatayaki",
  "Romantic Dining",
  "Russian",
  "Salad",
  "Sandwich",
  "Seafood Restaurant",
  "Seafood",
  "Shandong",
  "Shanghai Hairy Crab",
  "Shanghai",
  "Shanxi (Jin)",
  "Shanxi (Shan)",
  "Shunde",
  "Sichuan",
  "Singaporean",
  "Skewer",
  "Snack Shop & Deli",
  "Snake Soup",
  "Social Enterprise Restaurant",
  "Soup",
  "Spanish",
  "Special Occasion Dining",
  "Steak House",
  "Stir-Fry",
  "Sushi Bar",
  "Sushi/Sashimi",
  "Sweet Soup",
  "Taiwan",
  "Taiwanese Drink",
  "Takeaway",
  "Tea House",
  "Tea Restaurant",
  "Teppanyaki",
  "Thai",
  "Turkish",
  "Udon",
  "Upper-floor Cafe",
  "Vegetarian",
  "Vietnamese",
  "Western Restaurant",
  "Western",
  "Wine/Cigar",
  "Wonton/Dumpling",
  "Xinjiang",
  "Yoshoku",
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
