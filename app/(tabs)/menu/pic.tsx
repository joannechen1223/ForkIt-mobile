import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import { HighlightButton } from "@/components/menu/Buttons";
import MenuCamera from "@/components/menu/Camera";
import ItemDetail from "@/components/menu/ItemDetail";

const PicScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null); // State to store photo URI
  const [photoOrientation, setPhotoOrientation] = useState<string | null>(null);

  const item = useSelector((state: any) => state.menu.items[1]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRetake = () => {
    setPhotoUri(null);
    setPhotoOrientation(null);
  };

  if (!photoUri) {
    return (
      <MenuCamera
        setPhotoUri={setPhotoUri}
        setPhotoOrientation={setPhotoOrientation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={
          (styles.scrollViewContent,
          photoOrientation === "landscape"
            ? { width: 1400 }
            : { width: "100%" })
        }
      >
        <ImageBackground
          source={{ uri: photoUri }}
          style={[
            styles.background,
            {
              width: photoOrientation === "landscape" ? 1400 : "100%",
              height: "100%",
            },
          ]}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => openModal()}
          >
            <Text style={styles.text}>Soupe à l'Oignon</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
      <View style={styles.buttonGroup}>
        <View style={styles.aiSummary}>
          <TouchableOpacity style={styles.aiSummaryButton}>
            <Text style={styles.aiSummaryButtonText}>Menu Summary</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.retake}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeButtonText}>Retake Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalHeader}>
            <HighlightButton />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ItemDetail item={item} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  background: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    left: 70,
    top: 270,
  },
  text: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    zIndex: 10,
  },
  aiSummary: {
    borderWidth: 7,
    borderColor: "black",
    borderRadius: 30,
    width: 180,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  retake: {
    borderWidth: 7,
    borderColor: "white",
    borderRadius: 30,
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  aiSummaryButton: {
    width: "100%",
    height: 48,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#FFD771",
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButton: {
    width: "100%",
    height: 48,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#552300",
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#552300",
  },
  aiSummaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD771",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 15,
  },
  modalContent: {
    width: "100%",
    minHeight: "50%",
    maxHeight: "80%",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default PicScreen;
