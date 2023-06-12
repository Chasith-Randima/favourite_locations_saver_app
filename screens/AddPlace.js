import { Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utill/database";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    // place.id = new Date().toISOString() + Math.random().toString()
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
