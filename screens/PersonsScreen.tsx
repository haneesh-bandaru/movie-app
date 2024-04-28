import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  avatar,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";
import {
  background_color,
  gray_color,
  subtitle_color,
  text_color,
  yellow_color,
} from "../theme";
import NavigationBar from "../components/navigation";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

interface PersonDetails {
  name: string;
  place_of_birth: string;
  gender: number;
  birthday: string;
  known_for_department: string;
  popularity: number;
  biography: string;
  profile_path: string | null;
}

interface PersonMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function PersonsScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState<PersonMovie[]>([]);
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (item) {
      getPersonDetails(item.id);
      getPersonMovies(item.id);
    }
  }, [item]);

  const getPersonDetails = async (id: number) => {
    const response = await fetchPersonDetails(id);
    setPerson(response);
    setLoading(false);
  };

  const getPersonMovies = async (id: number) => {
    const response = await fetchPersonMovies(id);
    if (response.cast) {
      setPersonMovies(response.cast);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <NavigationBar />

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            {person?.profile_path ? (
              <Image
                style={styles.image}
                source={{ uri: image342(person.profile_path) }}
              />
            ) : (
              <Image style={styles.image} source={{ uri: avatar }} />
            )}
          </View>

          <View style={styles.personInfo}>
            <Text style={styles.name}>{person?.name}</Text>
            <Text style={styles.location}>{person?.place_of_birth}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailText}>
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>BirthDay</Text>
              <Text style={styles.detailText}>{person?.birthday}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Known for</Text>
              <Text style={styles.detailText}>
                {person?.known_for_department}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Popularity</Text>
              <Text style={styles.detailText}>
                {person?.popularity !== undefined
                  ? person.popularity.toFixed(2) + "%"
                  : "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.biography}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>
              {person?.biography || "N/A"}
            </Text>
          </View>

          <MovieList title={"Movies"} data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background_color,
  },
  safeAreaView: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: ios ? 0 : 16,
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
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "gray",
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  },
  image: {
    height: height * 0.3,
    width: width * 0.74,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: text_color,
  },
  personInfo: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: text_color,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: gray_color,
  },
  detailsContainer: {
    marginHorizontal: 12,
    paddingVertical: 16,
    marginTop: 24,
    backgroundColor: subtitle_color,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    borderRightWidth: 2,
    borderRightColor: "#646464",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  detailLabel: {
    color: text_color,
    fontWeight: "bold",
  },
  detailText: {
    color: gray_color,
    fontSize: 12,
  },
  biography: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  biographyTitle: {
    color: text_color,
    fontSize: 18,
    marginBottom: 8,
  },
  biographyText: {
    color: gray_color,
    fontSize: 14,
    lineHeight: 24,
  },
});
