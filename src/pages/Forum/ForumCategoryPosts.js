import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDocs, getDoc, collection, query } from "firebase/firestore";
import { db } from "../../config/Firebase";

const ForumPage = ({ navigation }) => {
  const route = useRoute();
  const { categoryId } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsAndAuthors = async () => {
      try {
        const postsCollectionRef = collection(db, "forum", categoryId, "posts");
        const q = query(postsCollectionRef);
        const querySnapshot = await getDocs(q);
        const postsWithAuthorsAndComments = await Promise.all(
          querySnapshot.docs.map(async (documentSnapshot) => {
            const postData = documentSnapshot.data();
            const authorRef = doc(db, "users", postData.authorId);
            const authorDoc = await getDoc(authorRef);

            // Fetch comments for the post
            const commentsCollectionRef = collection(
              db,
              "forum",
              categoryId,
              "posts",
              documentSnapshot.id,
              "comments"
            );
            const commentsSnapshot = await getDocs(commentsCollectionRef);
            const commentCount = commentsSnapshot.size;

            return {
              id: documentSnapshot.id,
              ...postData,
              authorName: authorDoc.exists()
                ? authorDoc.data().name
                : "Unknown",
              authorPic: authorDoc.exists()
                ? authorDoc.data().profilePic
                : "https://i.imgur.com/An9lt8E.png",
              commentCount,
            };
          })
        );
        const sortedPosts = postsWithAuthorsAndComments.sort(
          (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts and authors:", error);
      }
    };

    fetchPostsAndAuthors();
  }, [categoryId]);

  function truncateDescription(description) {
    // Replace <br/> tags with a space.
    const cleanedDescription = description.replace(/<br\/>/g, " ");

    const words = cleanedDescription.split(" ");
    if (words.length > 15) {
      return `${words.slice(0, 15).join(" ")}...`;
    }
    return cleanedDescription;
  }

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
          onPress={() => navigation.navigate("ForumPage")}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          {categoryId}
        </Text>
      </View>

      <CustomKeyboardView>
        <ScrollView>
          {/* List of posts */}
          <View className="flex-1 gap-8 mb-10">
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postContainer}
                onPress={() =>
                  navigation.navigate("ForumPost", {
                    postId: post.id,
                    category: categoryId,
                  })
                }
              >
                {/* info  */}
                <View className="flex-col gap-3">
                  <View className="flex-row pb-1.5 justify-between items-center">
                    <View className="flex-row gap-3 items-center">
                      <Image
                        source={{
                          uri:
                            post.authorPic || "https://i.imgur.com/An9lt8E.png",
                        }}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                      />
                      <View>
                        <Text
                          style={{ fontSize: hp(2) }}
                          className="font-semibold"
                        >
                          {post.authorName}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* first row */}
                  <Text
                    className="font-semibold"
                    style={{ fontSize: hp(2.25), color: "#bf165e" }}
                  >
                    {post.title}
                  </Text>
                  {/* title */}
                  <Text className="" style={{ fontSize: hp(1.75) }}>
                    {truncateDescription(post.desc)}
                  </Text>

                  {/* comments */}
                  <View className="flex-row justify-between items-center pt-2.5">
                    <Text
                      style={{ fontSize: hp(1.6) }}
                      className="text-neutral-400"
                    >
                      {post.createdAt.toDate().toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                    <Text
                      className=" text-neutral-400"
                      style={{ fontSize: hp(1.5) }}
                    >
                      {post.commentCount} Comments
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(2.5),
    borderRadius: 10,
  },
});

export default ForumPage;
