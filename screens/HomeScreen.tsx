import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

const ios = Platform.OS === "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };

  const getUpComingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data.results) {
      setUpcoming(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data.results) {
      setTopRated(data.results);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={ios ? styles.safeAreaIos : styles.safeAreaAndroid}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={styles.title}>Movie</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}

          <MovieList title="Upcoming" data={upcoming} hideSeeAll={false} />

          <MovieList title="Top Rated" data={topRated} hideSeeAll={false} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(55, 65, 81)",
  },
  safeAreaIos: {
    marginBottom: -2,
  },
  safeAreaAndroid: {
    marginBottom: -3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
