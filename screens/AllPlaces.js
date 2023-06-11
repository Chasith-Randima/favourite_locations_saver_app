import { Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utill/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      console.log(places);
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
    console.log(loadedPlaces);
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
