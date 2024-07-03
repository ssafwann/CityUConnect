import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import { db } from "../../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const LanguageSelected = ({ navigation }) => {
  const route = useRoute();
  const { wordId, category } = route.params;
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(true);
  const sound = useRef(new Audio.Sound());

  const [characters, setCharacters] = useState([]);
  const [jyutpings, setJyutpings] = useState([]);

  const loadSound = async (url) => {
    try {
      await sound.current.unloadAsync();
      await sound.current.loadAsync({ uri: url });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  };

  const playSound = async () => {
    try {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await sound.current.stopAsync();
        }
        await sound.current.setPositionAsync(0);
        await sound.current.playAsync();
      } else {
        console.warn("Sound is not loaded yet");
      }
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const docRef = doc(db, "language", category, "words", wordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const phraseData = docSnap.data();
          setPhrase(phraseData);
          if (phraseData.audio) {
            await loadSound(phraseData.audio);
          }

          setCharacters(phraseData.cantonese.split(""));
          setJyutpings(phraseData.jyutping.split(" "));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhrase();

    return () => {
      sound.current.unloadAsync();
    };
  }, [wordId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!phrase) {
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
            navigation.navigate("LPhrases", { categoryId: category })
          }
          style={{ marginRight: 20 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Language Learner
        </Text>
      </View>
      <CustomKeyboardView>
        <ScrollView>
          <View className="flex gap-8 pt-2">
            {/* english */}
            <View
              className="bg-white flex-col px-5 py-7 gap-6"
              style={{ borderRadius: 10, minHeight: hp(15) }}
            >
              <View
                style={{
                  backgroundColor: "#bf165e",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  alignSelf: "flex-start",
                  borderRadius: 5,
                }}
              >
                <Text className="text-white font-bold">English</Text>
              </View>
              <Text
                style={{
                  fontSize: hp(2.5),
                  fontWeight: "semibold",
                }}
              >
                {phrase.english}
              </Text>
            </View>
            {/* cantonese */}
            <View
              className="bg-white flex-col px-5 py-7 gap-6"
              style={{ borderRadius: 10 }}
            >
              {/* top label */}
              <View className="flex-row justify-between">
                <View
                  style={{
                    backgroundColor: "#bf165e",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    alignSelf: "flex-start",
                    borderRadius: 5,
                  }}
                >
                  <Text className="text-white font-bold">Cantonese</Text>
                </View>
                {/* Play Audio Icon */}
                <TouchableOpacity
                  onPress={playSound}
                  style={styles.iconContainer}
                >
                  <Ionicons
                    name="volume-high"
                    size={32}
                    color="rgb(99 102 241)"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.container}>
                {characters.map((char, index) => (
                  <View key={index} style={styles.charContainer}>
                    <Text style={styles.cantoneseText}>{char}</Text>
                    <Text style={styles.jyutpingText}>{jyutpings[index]}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 8,
  },
  textContainer: {
    flexShrink: 1,
  },
  cantoneseText: {
    fontSize: hp(3.5),
    fontWeight: "semibold",
    lineHeight: 33,
    textAlign: "center",
  },
  jyutpingText: {
    fontSize: hp(1.5),
    textAlign: "center",
    fontWeight: "semibold",
    marginTop: 4,
    marginBottom: 4,
    color: "red",
  },
});

export default LanguageSelected;
