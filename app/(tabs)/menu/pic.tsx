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
import ItemDetail from "@/components/menu/ItemDetail";

const PicScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const item = useSelector((state: any) => state.menu.items[1]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground
        source={require("@/assets/images/menu-pic.jpg")}
        style={styles.background}
      >
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => openModal()}
        >
          <Text style={styles.text}>Soupe à l'Oignon</Text>
        </TouchableOpacity>
        {/* Add more content here */}
      </ImageBackground>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  background: {
    width: 1000,
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
