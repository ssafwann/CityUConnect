import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useRoute } from "@react-navigation/native";
import { db } from "../../config/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../config/AuthContext";

const ForumPost = ({ navigation }) => {
  const route = useRoute();
  const { postId, category } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState([]);

  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "forum", category, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());

          // retrieve post author
          const postAuthorId = docSnap.data().authorId;
          const userRef = doc(db, "users", postAuthorId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setPostAuthor(userSnap.data());
          } else {
            console.log("No such user!");
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "forum", category, "posts", postId, "comments"),
          orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        const commentsArray = [];
        querySnapshot.forEach((doc) => {
          commentsArray.push(doc.data());
        });
        setComments(commentsArray);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const postComment = async () => {
    if (!message) {
      Alert.alert("Post Comment", "Please fill in the message box.");
      return;
    }

    try {
      const newComment = {
        authorID: user.uid,
        authorName: user.name,
        authorPic: user.profilePic
          ? user.profilePic
          : "https://i.imgur.com/An9lt8E.png",
        message,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "forum", category, "posts", postId, "comments"),
        newComment
      );

      const tempTimestamp = {
        toDate() {
          return new Date();
        },
      };

      const newCommentForUI = {
        ...newComment,
        createdAt: tempTimestamp,
      };

      setComments([...comments, newCommentForUI]);
      setMessage("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!post) {
    return <Text>No post found</Text>;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: hp(3), paddingHorizontal: wp(6) }}
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
          onPress={() =>
            navigation.navigate("ForumCategoryPosts", { categoryId: category })
          }
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Forum Post
        </Text>
      </View>

      <CustomKeyboardView>
        <ScrollView>
          <View className="flex-col gap-6">
            {/* author details */}
            <View
              className="bg-white flex-row px-7 py-7 gap-5"
              style={{ borderRadius: 10 }}
            >
              <Image
                source={{
                  uri:
                    postAuthor.profilePic || "https://i.imgur.com/An9lt8E.png",
                }}
                style={{ width: 44, height: 44, borderRadius: 100 }}
              />
              <View className="flex-col justify-between">
                {postAuthor.userID === user.uid ? (
                  <Text className="font-bold text-black">
                    {postAuthor.name}
                  </Text>
                ) : (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("PeoplesProfile", {
                        postAuthorId: postAuthor.userID,
                      });
                    }}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.25 : 1,
                      },
                      styles.wrapperCustom,
                    ]}
                  >
                    <Text className="font-bold text-indigo-700">
                      {postAuthor.name}
                    </Text>
                  </Pressable>
                )}

                <View className="flex-row gap-2 items-center">
                  <AntDesign name="clockcircle" size={12} color="black" />
                  <Text
                    style={{ fontSize: hp(1.6) }}
                    className="text-neutral-400"
                  >
                    {post.createdAt.toDate().toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>

            {/* post details */}
            <View
              className="bg-white flex-col px-7 py-12 gap-5"
              style={{ borderRadius: 10 }}
            >
              <Text
                style={{ fontSize: hp(1.5) }}
                className="text-neutral-400 font-semibold"
              >
                #{category.toLowerCase().replace(/\s+/g, "")}
              </Text>

              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold leading-6 pb-1"
              >
                {post.title}
              </Text>

              <Text className="leading-6">
                {post.desc.replace(/<br\/>/g, "\n")}
              </Text>
            </View>

            {/* comments */}
            <View
              className="bg-white flex-col px-7 py-12 gap-5 mt-5"
              style={{ borderRadius: 10 }}
            >
              <Text
                className="leading-6 font-bold text-black mb-3"
                style={{ fontSize: hp(2) }}
              >
                Comments ({comments.length})
              </Text>

              <View className="flex-col gap-10">
                {comments.length === 0 ? (
                  <Text>No comments yet. You can be the first one!</Text>
                ) : (
                  comments.map((comment, index) => (
                    <View key={index} className="flex-col gap-3">
                      <View className="flex-row items-center gap-3">
                        <Image
                          source={{
                            uri:
                              comment.authorPic ||
                              "https://i.imgur.com/An9lt8E.png",
                          }}
                          style={{ width: 32, height: 32, borderRadius: 100 }}
                        />
                        {comment.authorID === user.uid ? (
                          <Text className="font-semibold text-black">
                            {comment.authorName}
                          </Text>
                        ) : (
                          <Pressable
                            onPress={() => {
                              navigation.navigate("PeoplesProfile", {
                                postAuthorId: comment.authorID,
                              });
                            }}
                            style={({ pressed }) => [
                              {
                                opacity: pressed ? 0.25 : 1,
                              },
                              styles.wrapperCustom,
                            ]}
                          >
                            <Text className="font-semibold text-indigo-700">
                              {comment.authorName}
                            </Text>
                          </Pressable>
                        )}
                      </View>
                      <Text
                        style={{ fontSize: hp(1.6) }}
                        className="text-neutral-400 mb-1"
                      >
                        {comment.createdAt.toDate().toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Text>
                      <Text>{comment.message}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            {/* comment form */}
            <View
              className="bg-white flex-col px-7 py-12 gap-5 mb-10"
              style={{ borderRadius: 10 }}
            >
              <Text
                className="leading-6 font-bold text-black"
                style={{ fontSize: hp(1.9) }}
              >
                Write Comment
              </Text>
              <Text className="text-neutral-400 font-bold">Message:</Text>
              <View
                style={{ height: hp(15), paddingTop: 10 }}
                className="flex-row gap-4 px-4 bg-neutral-100 rounded-xl items-start"
              >
                <TextInput
                  onChangeText={(text) => setMessage(text)}
                  style={{ fontSize: 14 }}
                  className="text-neutral-800"
                  placeholder="Give feedback on this post"
                  placeholderTextColor={"gray"}
                  keyboardType="text"
                  multiline={true}
                  numberOfLines={1}
                  value={message}
                />
              </View>
              <TouchableOpacity
                style={styles.createPostButton}
                onPress={postComment}
              >
                <Text
                  style={{ color: "#fff" }}
                  className="font-bold tracking-wider"
                >
                  Post Comment
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
    height: hp(5),
  },
});

export default ForumPost;
