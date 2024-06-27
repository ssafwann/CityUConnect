import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const ForumPage = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const forumDb = await getDocs(collection(db, "forum"));
        const categories = forumDb.docs.map((doc) => ({
          id: doc.id,
          name: doc.id,
          iconName: doc.data().iconName,
        }));
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: hp(2),
        paddingHorizontal: wp(5),
      }}
      edges={["right", "top", "left"]}
    >
      {/* Fixed Header */}
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Forum Categories
        </Text>
      </View>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <CustomButton
            buttonText="Create Post"
            onPress={() => navigation.navigate("ForumCreatePost")}
          />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForumCategoryPosts", {
                categoryId: item.id,
              });
            }}
            style={{
              backgroundColor: "white",
              marginBottom: 10,
              padding: hp(2.5),
              borderRadius: 10,
              flex: 1,
              margin: 5,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <MaterialIcons
                name={item.iconName}
                size={hp(4.5)}
                color="#bf165e"
                style={{ marginBottom: 18 }}
              />
              <Text
                style={{ fontSize: hp(1.8) }}
                className="text-black font-bold tracking-wider text-center"
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

styles = {
  buttonTouch: {
    backgroundColor: "#bf165e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
    width: wp(90),
  },
};

export default ForumPage;
