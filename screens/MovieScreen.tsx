import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarDetails,
  image500,
} from "../api/moviedb";
import {
  background_color,
  subtitle_color,
  text_color,
  yellow_color,
} from "../theme";
import NavigationBar from "../components/navigation";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

interface Movie {
  id: number;
  title: string;
  status: string;
  release_date: string | null;
  runtime: number;
  poster_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface Props {}

const MovieScreen: React.FC<Props> = () => {
  const { params: item } = useRoute<{ item: Movie }>();
  const navigation = useNavigation();
  const [isFavorite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similarMovies, setsimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id: number) => {
    try {
      const response = await fetchMovieDetails(id);
      setMovie(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieCredits = async (id: number) => {
    try {
      const response = await fetchMovieCredits(id);
      setCast(response.cast);
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilarMovies = async (id: number) => {
    try {
      const response = await fetchSimilarDetails(id);
      setsimilarMovies(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NavigationBar />
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{ uri: image500(movie?.poster_path ?? "") }}
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={styles.gradient}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
      )}

      <View style={styles.imageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.subtitle}>
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
          <View style={styles.genresContainer}>
            {movie?.genres &&
              Array.isArray(movie.genres) &&
              movie.genres.map((genre, index) => {
                let showDot = index + 1 !== movie.genres.length;
                return (
                  <Text key={index} style={styles.genres}>
                    {genre.name}
                    {showDot ? " • " : null}
                  </Text>
                );
              })}
          </View>
        </View>
      </View>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{movie?.overview}</Text>

      <Cast navigation={navigation} cast={cast} />

      <MovieList title="Top Rated" data={similarMovies} hideSeeAll={false} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background_color,
    paddingBottom: 20,
  },
  safeAreaView: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  backButton: {
    borderRadius: 10,
    padding: 2,
    backgroundColor: yellow_color,
  },
  heartButton: {
    padding: 8,
  },
  imageContainer: {
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: height * 0.55,
  },
  gradient: {
    width: "100%",
    height: height * 0.4,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    marginTop: -height * 0.09,
    alignItems: "center",
  },
  title: {
    color: text_color,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: subtitle_color,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  genresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  genres: {
    color: subtitle_color,
    fontSize: 14,
    fontWeight: "bold",
  },
  descriptionTitle: {
    color: text_color,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 16,
  },
  description: {
    color: subtitle_color,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 16,
  },
});

export default MovieScreen;
