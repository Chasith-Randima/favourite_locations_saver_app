import { Button, View, Alert, Image, Text, StyleSheet } from "react-native";
import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { Colors } from "../../constants/colors";

import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (
      cameraPermissionInformation.status === PermissionStatus.UNDETERMIND ||
      cameraPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const permissionResponse = await requestPermission();
      permissionResponse.canAskAgain = true;

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permissions to use this app"
      );

      const permissionResponse = await requestPermission();
      console.log(permissionResponse, "new");

      return permissionResponse.granted;

      // return false;
    }

    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);

    console.log(image);
  };

  let imagePreview = <Text>No Image Taken Yet</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <>
      <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <OutlinedButton icon={"camera"} onPress={takeImageHandler}>
          Take Image
        </OutlinedButton>
      </View>
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
