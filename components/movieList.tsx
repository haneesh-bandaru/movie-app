import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";
import { text_color } from "../theme";

const { width, height } = Dimensions.get("window");

interface Movie {
  title: string;
  poster_path: string | null;
}

interface Props {
  title: string;
  data: Movie[];
  hideSeeAll?: boolean;
}

const MovieList: React.FC<Props> = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation<any>(); // add any type for navigation

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View style={styles.movieContainer}>
              <Image
                source={{
                  uri: item.poster_path ? image185(item.poster_path) : null,
                }}
                style={styles.image}
              />

              <Text style={styles.movieName}>
                {item.title &&
                  typeof item.title === "string" &&
                  (item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    color: text_color,
    fontSize: 20,
  },
  seeAll: {
    color: text_color,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  movieContainer: {
    marginRight: 12,
  },
  image: {
    width: width / 3,
    height: height * 0.22,
    borderRadius: 20,
  },
  movieName: {
    color: text_color,
    marginLeft: 4,
  },
});

export default MovieList;
