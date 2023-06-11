import { Alert, View, StyleSheet, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { getAddress, getMapPreview, location } from "../../utill/location";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
// import { useSafeAreaFrame } from "react-native-safe-area-context";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ onPickedLocation }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const verifyPermissions = async () => {
    console.log(locationPermissionInformation);
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location access permissions to use this app"
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    console.log(pickedLocation);
  };

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        // console.log(address);
        // onPickedLocation(pickedLocation);
        onPickedLocation({ ...pickedLocation, address: address });
        // console.log(pickedLocation);
      }
    };
    handleLocation();
  }, [pickedLocation, onPickedLocation]);
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No Location Picked Yet.</Text>;

  if (pickedLocation) {
    // console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng));
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Location User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4,
  },
});
