import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { HighlightButton } from "@/components/menu/Buttons";
import MenuCamera from "@/components/menu/Camera";
import ItemDetail from "@/components/menu/ItemDetail";
import { uploadMenu } from "@/features/Menu/camera";
import getDishes from "@/features/Menu/dishes";
import { checkMenuReady } from "@/features/Menu/menu";
import { resetMenu } from "@/features/Menu/menuSlice";

const PicScreen = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const photo = useSelector((state: any) => state.menu.photo);
  const [isUploading, setIsUploading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // const item = useSelector((state: any) => state.menu.items[1]);
  const menu = useSelector((state: any) => state.menu.menu);
  const dishes = useSelector((state: any) => state.menu.dishes);
  const [selectedDishId, setSelectedDishId] = useState<number | null>(null);

  const openModal = async (dishId: number) => {
    setSelectedDishId(dishId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDishId(null);
  };

  const handleRetake = () => {
    dispatch(resetMenu());
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    console.log("isChecking", isChecking);

    if (isChecking && menu?.id && !menu.isReady) {
      intervalId = setInterval(async () => {
        const ready = await checkMenuReady(menu.id, dispatch);
        console.log("ready", ready);
        if (ready) {
          await getDishes(menu.id, dispatch);
          setIsChecking(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isChecking, menu?.id, menu?.isReady, dispatch]);

  if (!photo.uri) {
    return <MenuCamera />;
  }

  const handleMenuUpload = async () => {
    setIsUploading(true);
    await uploadMenu(photo.uri, dispatch);
    setIsUploading(false);
    setIsChecking(true);
  };

  const isUploadingOrHasMenu = isUploading || menu?.id;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={
          photo.orientation === "landscape"
            ? { width: 1400 }
            : { width: "100%" }
        }
      >
        {isUploadingOrHasMenu && <View style={styles.overlay} />}
        <ImageBackground
          source={{ uri: photo.uri }}
          style={[
            styles.background,
            {
              width: photo.orientation === "landscape" ? 1400 : "100%",
              height: "100%",
            },
          ]}
          resizeMode="contain"
        >
          {isUploading && (
            <View style={styles.uploadingContainer}>
              <ActivityIndicator size="large" color="#FFD771" />
              <Text style={styles.uploadingText}>Uploading...</Text>
            </View>
          )}
          <View style={styles.dishContainerWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dishContainer}
            >
              {Object.values(dishes).map((dish: any) => {
                // const position = dish.position;
                // const x =
                //   position?.x && photoDimensions?.width
                //     ? (position.x / photoDimensions.width) *
                //       scrollViewDimensions.width
                //     : 0;
                // const y =
                //   position?.y && photoDimensions?.height
                //     ? (position.y / photoDimensions.height) *
                //       scrollViewDimensions.height
                //     : 0;
                // console.log(dish.name, x, y);
                return (
                  <TouchableOpacity
                    onPress={() => openModal(dish.id)}
                    key={dish.id}
                  >
                    <Text style={styles.text}>{dish.translationName}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </ScrollView>
      <View style={styles.buttonGroup}>
        <View style={styles.uploadMenu}>
          <TouchableOpacity
            style={styles.uploadMenuButton}
            onPress={handleMenuUpload}
          >
            <Text style={styles.uploadMenuButtonText}>Upload Menu</Text>
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
              {selectedDishId && <ItemDetail dish={dishes[selectedDishId]} />}
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 1,
  },
  dishContainerWrapper: {
    position: "absolute",
    top: 80,
    left: 0,
    padding: 30,
    width: "100%",
    height: "70%",
    zIndex: 100,
  },
  dishContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 11,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 140,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 5,
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
  uploadMenu: {
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
  uploadMenuButton: {
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
  uploadMenuButtonText: {
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
  uploadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  uploadingText: {
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default PicScreen;
