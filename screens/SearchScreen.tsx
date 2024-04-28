import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import { image185, searchMovies } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies(value)
        .then((data) => {
          setLoading(false);
          setResults(data.results); // Assuming `data` is the array of search results
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching search results:", error);
          setResults([]); // Clear results in case of error
        });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={{ backgroundColor: "#1F1F1F", flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"gray"}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.closeButton}
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Text style={styles.resultsText}>Results ({results.length})</Text>
          <View style={styles.moviesContainer}>
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate("Movie", item)}
              >
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.movieImage}
                  />
                  <Text style={styles.movieName}>
                    {item &&
                      item.title &&
                      typeof item.title === "string" &&
                      (item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.placeholderContainer}>
          <Image
            source={require("../assets/images/designer.png")}
            style={styles.placeholderImage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = {
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 40 : 40,
    flexDirection: "row" as "row",
    justifyContent: "space-between" as "space-between",
    alignItems: "center" as "center",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    paddingBottom: 5,
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: "bold" as "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 8,
    margin: 2,
    borderRadius: 20,
    backgroundColor: "#666666",
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  resultsText: {
    color: "white",
    fontWeight: "bold" as "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  moviesContainer: {
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    justifyContent: "space-between" as "space-between",
  },
  movieItem: {
    marginBottom: 20,
  },
  movieImage: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 20,
  },
  movieName: {
    color: "#CCCCCC",
    marginLeft: 10,
  },
  placeholderContainer: {
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
    marginTop: 20,
  },
  placeholderImage: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 20,
  },
};
