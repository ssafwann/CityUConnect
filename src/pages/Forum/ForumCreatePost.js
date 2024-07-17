import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNPickerSelect from "react-native-picker-select";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../config/AuthContext";

const ForumCreatePost = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const forumDb = await getDocs(collection(db, "forum"));
        const categories = forumDb.docs.map((doc) => ({
          label: doc.id,
          value: doc.id,
        }));
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCategories();
  }, []);

  const createPost = async () => {
    if (!title || !description || !selectedCategory) {
      Alert.alert("Create Post", "Please fill in all the fields.");
      return;
    }

    const encodedDescription = description.replace(/\n/g, "<br/>");

    try {
      const post = {
        authorId: user?.uid,
        title,
        desc: encodedDescription,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "forum", selectedCategory, "posts"),
        post
      );

      Alert.alert("Create Post", "Post created successfully!");

      navigation.navigate("ForumPost", {
        postId: docRef.id,
        category: selectedCategory,
      });

      setTitle("");
      setDescription("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error creating post: ", error);
      Alert.alert("Create Post", "There was an error creating the post.");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: hp(2), paddingHorizontal: wp(5) }}
      edges={["right", "top", "left"]}
    >
      <CustomKeyboardView>
        <ScrollView>
          {/* header */}
          <View style={{ alignItems: "center", marginBottom: 15 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              Create Forum Post
            </Text>
          </View>

          {/* form + buttons */}
          <View
            className="flex-1 gap-6"
            style={{
              paddingTop: hp(2),
            }}
          >
            {/* form */}
            <View className="flex-1 gap-4">
              {/* post tile */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4, fontSize: 18 }}
                  className="font-bold"
                >
                  Post Title
                </Text>
                <View
                  style={{ height: hp(10), paddingTop: 10 }}
                  className="flex-row gap-4 px-4 bg-neutral-200 rounded-xl items-start"
                >
                  <TextInput
                    onChangeText={(text) => setTitle(text)}
                    style={{ fontSize: 17 }}
                    className="text-neutral-800"
                    placeholder="Enter a title that desribes your post"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    multiline={true}
                    numberOfLines={1}
                    value={title}
                  />
                </View>
              </View>

              {/* post content */}
              <View className="flex-col">
                <Text
                  style={{ marginLeft: 4, marginBottom: 4, fontSize: 18 }}
                  className="font-bold"
                >
                  Post Content
                </Text>
                <View
                  style={{ height: hp(25), paddingTop: 10 }}
                  className="flex-row gap-4 px-4 bg-neutral-200 rounded-xl items-start"
                >
                  <TextInput
                    onChangeText={(text) => setDescription(text)}
                    style={{ fontSize: 17 }}
                    className="text-neutral-800"
                    placeholder="Enter the post content"
                    placeholderTextColor={"black"}
                    keyboardType="text"
                    multiline={true}
                    numberOfLines={1}
                    value={description}
                  />
                </View>
              </View>
            </View>

            {/* category */}
            <View className="flex-col">
              <Text
                style={{ marginLeft: 4, marginBottom: 4, fontSize: 18 }}
                className="font-bold"
              >
                Post Category
              </Text>
              <RNPickerSelect
                placeholder={{
                  label: "Select a category for your post",
                  value: null,
                  color: "blue",
                }}
                items={categories}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                }}
                value={selectedCategory}
                Icon={() => (
                  <Entypo name="chevron-down" size={24} color="black" />
                )}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
              />
            </View>

            {/* buttons */}
            <View className="gap-4">
              <TouchableOpacity
                style={styles.createPostButton}
                onPress={createPost}
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-white font-bold tracking-wider"
                >
                  Create Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  navigation.goBack();
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
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createPostButton: {
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default ForumCreatePost;
