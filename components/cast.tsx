import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { avatar, image185 } from "../api/moviedb";

interface Actor {
  profile_path: string;
  character: string;
  original_name: string;
}

interface Props {
  cast: Actor[];
  navigation: any;
}

const Cast: React.FC<Props> = ({ cast, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cast &&
          cast.map((actor, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Person", actor);
              }}
              key={index}
              style={styles.actorContainer}
            >
              <View style={styles.imageContainer}>
                {actor.profile_path ? (
                  <Image
                    style={styles.image}
                    source={{ uri: image185(actor.profile_path) }}
                  />
                ) : (
                  <Image style={styles.image} source={{ uri: avatar }} />
                )}
              </View>

              <Text style={styles.characterName}>
                {actor &&
                  actor.character &&
                  typeof actor.character === "string" &&
                  (actor.character.length > 10
                    ? actor.character.slice(0, 10) + "..."
                    : actor.character)}
              </Text>

              <Text style={styles.personName}>
                {actor &&
                  actor.original_name &&
                  typeof actor.original_name === "string" &&
                  (actor.original_name.length > 10
                    ? actor.original_name.slice(0, 10) + "..."
                    : actor.original_name)}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 16,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  actorContainer: {
    marginRight: 10,
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgb(55, 65, 81)",
    borderWidth: 1,
  },
  image: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  characterName: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
  },
  personName: {
    color: "rgb(107, 114, 128)",
    fontSize: 12,
    marginTop: 2,
  },
});

export default Cast;
