import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

import ingredientsDict from "@/data/ingredients";

const IngredientModal = ({
  ingredientName,
  open,
  setOpen,
}: {
  ingredientName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setOpen(false)}
        >
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: ingredientsDict[
                  ingredientName as keyof typeof ingredientsDict
                ].imageUrl,
              }}
              style={styles.image}
            />
          </View>
          <Text style={styles.content}>
            {
              ingredientsDict[ingredientName as keyof typeof ingredientsDict]
                .explanation
            }
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 30,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  content: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Times New Roman",
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
});

export default IngredientModal;
