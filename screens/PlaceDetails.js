import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utill/database";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: fetchedPlace && fetchedPlace.location.lat,
      initialLng: fetchedPlace && fetchedPlace.location.lng,
    });
  };
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      // console.log(selectedPlaceId);
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title || "Place Details",
      });
    };
    loadPlaceData();
  }, [selectedPlaceId]);

  // if (!fetchedPlace) {
  //   return (
  //     <View style={styles.fallBack}>
  //       <Text style={styles.fallBackText}>Loading Place Data...</Text>
  //     </View>
  //   );
  // }
  return (
    <ScrollView>
      {fetchedPlace && (
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      )}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          {fetchedPlace && (
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          )}
        </View>
        <OutlinedButton icon={"map"} onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    color: "white",
    fontSize: 24,
  },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
