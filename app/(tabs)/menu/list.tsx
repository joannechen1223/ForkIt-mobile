import React, { useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import SimpleScrollView from "@/components/SimpleScrollView";
import IngredientModal from "@/components/menu/IngredientModal";
import ListDishCard from "@/components/menu/ListItemCard";
import { HorizontalLine } from "@/components/ui/HorizontalLine";

const ListScreen = () => {
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const isReady = useSelector((state: any) => state.menu.menu.isReady);
  const dishes = useSelector((state: any) => state.menu.dishes);

  const handleCloseIngredientModal = () => {
    setOpenIngredientModal(false);
    setIngredientName("");
  };

  if (!isReady) {
    return (
      <View style={styles.contentContainer}>
        <ActivityIndicator size="large" color="#FFD771" />
        <Text style={styles.loadingText}>Preparing menu information...</Text>
      </View>
    );
  }

  return (
    <SimpleScrollView>
      <View style={styles.contentContainer}>
        {Object.values(dishes).map((dish: any) => (
          <React.Fragment key={dish.id}>
            <ListDishCard
              dish={dish}
              setOpenIngredientModal={setOpenIngredientModal}
              setIngredientName={setIngredientName}
            />
            <HorizontalLine />
          </React.Fragment>
        ))}
      </View>
      {openIngredientModal && (
        <IngredientModal
          ingredientName={ingredientName}
          open={openIngredientModal}
          handleClose={handleCloseIngredientModal}
        />
      )}
    </SimpleScrollView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    flexGrow: 0,
  },
  menuTabContainer: {
    flexDirection: "row",
    paddingHorizontal: 23,
    borderBottomWidth: 4,
    borderBottomColor: "#c5c5c5",
  },
  menuTab: {
    marginHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
    marginBottom: -4,
  },
  menuTabActive: {
    borderBottomColor: "#593c0a",
  },
  menuTabText: {
    fontFamily: "Times New Roman",
    color: "#593c0a",
    fontSize: 20,
    fontWeight: "400",
  },
  menuTabTextActive: {
    color: "#593c0a",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#593c0a",
    marginTop: 20,
  },
});

export default ListScreen;
