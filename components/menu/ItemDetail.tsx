import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";

import AllergenIcon from "@/components/AllergenIcon";
import FlagIcon from "@/components/FlagIcon";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import ingredientsDict from "@/data/ingredients";
import { Dish } from "@/features/Menu/dishes";

import IngredientModal from "./IngredientModal";

const ListDishDetail = ({ dish }: { dish: Dish }) => {
  const {
    name,
    translationName,
    ingredients,
    allergens,
    description,
    flavorMapping,
    newFlavor,
  } = dish;

  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [ingredientName, setIngredientName] = useState("");

  const handleIngredientPress = (ingredient: string) => {
    setIngredientName(ingredient);
    setOpenIngredientModal(true);
  };

  const handleCloseIngredientModal = () => {
    setOpenIngredientModal(false);
    setIngredientName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.translationName}>{translationName}</Text>
      <View style={styles.ingredients}>
        {ingredients?.map((ingredient: string, index: number) => (
          <Text key={ingredient + index} style={styles.ingredientText}>
            {ingredient}
            {ingredientsDict[ingredient as keyof typeof ingredientsDict] && (
              <TouchableOpacity
                onPress={() => handleIngredientPress(ingredient)}
              >
                <MaterialIcons
                  name="search"
                  size={16}
                  color="#ffac1d"
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            )}
            {index !== ingredients.length - 1 && ", "}
          </Text>
        ))}
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.imageContainer}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={require("@/assets/food/hors_doeuvres/soupe_a_loignon.webp")} // placeholder
          style={styles.image}
        />
        {/* {imageUrls &&
          imageUrls.map((imageUrl: ImageSourcePropType, index: number) => (
            <Image key={index} source={imageUrl} style={styles.image} />
          ))} */}
      </ScrollView>
      <View style={styles.allergensContainer}>
        <Text style={styles.allergensTitle}>Allergens: </Text>
        {allergens?.map((allergen: string) => (
          <AllergenIcon
            key={allergen}
            allergen={allergen as "Gluten" | "Dairy" | "Nuts"}
            size={28}
          />
        ))}
      </View>
      <View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <HorizontalLine color="#B48B6E" />

      <View style={styles.flavorMappingContainer}>
        <View style={styles.flavorMappingTitleContainer}>
          <FlagIcon countryCode="US" size={20} />
          <Text style={styles.flavorMappingTitle}>
            What you'll find familiar
          </Text>
        </View>
        <Text style={[styles.flavorMappingText, { fontWeight: "bold" }]}>
          American version of it will be:
        </Text>
        <Text style={styles.flavorMappingText}>{flavorMapping}</Text>
      </View>
      <View style={styles.flavorMappingContainer}>
        <View style={styles.flavorMappingTitleContainer}>
          <View style={styles.aiChatIconContainer}>
            <Image
              source={require("@/assets/icons/aiChat.png")}
              style={styles.aiChatIcon}
            />
          </View>
          <Text style={styles.flavorMappingTitle}>What's new and exciting</Text>
        </View>
        {newFlavor && <Text style={styles.flavorMappingText}>{newFlavor}</Text>}
      </View>
      <HorizontalLine color="#B48B6E" />
      {/* <TouchableOpacity style={[styles.button, { backgroundColor: "#D1CCFF" }]}>
        <Text style={styles.buttonText}>135 Reviews</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#FFFACD" }]}>
        <Text style={styles.buttonText}>Leave a Review</Text>
      </TouchableOpacity> */}
      {ingredientName && (
        <>
          <Text>{ingredientName}</Text>
          <IngredientModal
            ingredientName={ingredientName}
            open={openIngredientModal}
            handleClose={handleCloseIngredientModal}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  translationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#552300",
  },
  ingredients: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    alignItems: "flex-end",
  },
  ingredientText: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: "Times New Roman",
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginRight: 10,
  },
  imageContainer: {
    flexDirection: "row",
  },
  allergensContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  allergensTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#552300",
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: "Times New Roman",
    color: "#552300",
  },
  flavorMappingContainer: {
    flexDirection: "column",
    gap: 10,
  },
  flavorMappingTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flavorMappingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFAC1D",
  },
  flavorMappingText: {
    fontSize: 16,
    fontFamily: "Times New Roman",
  },
  aiChatIcon: {
    width: 20,
    height: 20,
  },
  aiChatIconContainer: {
    backgroundColor: "#8DD0C5",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});

export default ListDishDetail;
