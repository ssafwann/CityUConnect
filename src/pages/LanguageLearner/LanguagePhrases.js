import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/Firebase";
import { collection, getDocs, query } from "firebase/firestore";

const LanguagePhrases = ({ navigation }) => {
  const route = useRoute();
  const { categoryId } = route.params;
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const q = query(collection(db, "language", categoryId, "words"));
        const querySnapshot = await getDocs(q);
        const wordsArray = [];
        querySnapshot.forEach((doc) => {
          const wordData = doc.data();
          const wordWithId = { ...wordData, id: doc.id };
          wordsArray.push(wordWithId);
        });
        setWords(wordsArray);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchWords();
  }, [categoryId]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
      }}
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
          onPress={() => navigation.navigate("LLearner")}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          {categoryId}
        </Text>
      </View>
      <CustomKeyboardView>
        <ScrollView style={{ paddingTop: 4 }}>
          <View
            style={{
              backgroundColor: "#bf165e",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Text
              className="text-white font-semibold"
              style={{ fontSize: hp(1.75) }}
            >
              Phrases
            </Text>
          </View>

          {/* list container  */}
          <View className="flex-1 mb-10">
            {words.map((word, index) => (
              <TouchableOpacity
                key={word.id}
                style={[
                  styles.container,
                  { borderBottomWidth: index === words.length - 1 ? 0 : 1 },
                  index === words.length - 1
                    ? { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }
                    : {},
                ]}
                onPress={() =>
                  navigation.navigate("LSelected", {
                    wordId: word.id,
                    category: categoryId,
                  })
                }
              >
                <Text
                  className="text-black font-semibold"
                  style={{ fontSize: hp(2.25) }}
                >
                  {index + 1}. {word.english}
                </Text>
                <Text
                  className="text-neutral-500"
                  style={{ fontSize: hp(2.2), marginLeft: 20 }}
                >
                  {word.cantonese}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(2.5),
    gap: 10,
    borderBottomColor: "lightgray",
  },
});

export default LanguagePhrases;
