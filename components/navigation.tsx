import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { background_color, text_color, yellow_color } from "../theme";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navigation: any;
}

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function NavigationBar() {
  const [isFavorite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <ChevronLeftIcon size={28} strokeWidth={2.5} color={text_color} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavorite)}
        style={styles.heartButton}
      >
        <HeartIcon size={35} color={isFavorite ? yellow_color : text_color} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: ios ? 20 : 35,
  },
  backButton: {
    borderRadius: 10,
    padding: 2,
    backgroundColor: yellow_color,
  },
  heartButton: {
    padding: 8,
  },
});
