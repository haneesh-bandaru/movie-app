import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";
import { text_color } from "../theme";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface TrendingMoviesProps {
  data: Movie[];
}

const { width, height } = Dimensions.get("window");

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const navigation = useNavigation<any>();
  const handleClick = (item: Movie) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Movies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.06}
        sliderWidth={width}
        itemWidth={width * 0.7}
        slideStyle={styles.slide}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

interface MovieCardProps {
  item: Movie;
  handleClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, handleClick }) => {
  const imageUrl = image500(item.poster_path);

  // Check if imageUrl is not empty or null
  if (!imageUrl) {
    return null; // Or render a placeholder image
  }

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    color: text_color,
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  slide: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: width * 0.7,
    height: height * 0.5,
    borderRadius: 20,
  },
});

export default TrendingMovies;
