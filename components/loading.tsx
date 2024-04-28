import {
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const { width } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail
        color={["yellow"]}
        thickness={12}
        size={160}
        strokeCap="square"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", // Add a semi-transparent background for better visibility
  },
});
