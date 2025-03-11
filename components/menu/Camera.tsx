import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuCamera = ({
  setPhotoUri,
}: {
  setPhotoUri: (value: string) => void;
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setPhotoUri(photo.uri); // Store the photo URI in state
        } else {
          console.error("No photo data received");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        ref={cameraRef}
        style={styles.cameraContainer}
        facing={"back"}
      >
        <View style={styles.pictureButton}>
          <TouchableOpacity
            style={styles.pictureButtonInner}
            onPress={takePicture}
          />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Times New Roman",
    lineHeight: 21,
    marginBottom: 40,
    width: "60%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Arial",
    lineHeight: 21,
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pictureButton: {
    width: 90,
    height: 90,
    backgroundColor: "transparent",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#ffffff",
    bottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureButtonInner: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});

export default MenuCamera;
