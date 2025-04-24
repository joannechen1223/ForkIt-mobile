import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AllergenIcon from "@/components/AllergenIcon";
import ingredientsDict from "@/data/ingredients";
import { Dish } from "@/features/Menu/dishes";

const ListDishCard = ({
  dish,
  setOpenIngredientModal,
  setIngredientName,
}: {
  dish: Dish;
  setOpenIngredientModal: (open: boolean) => void;
  setIngredientName: (name: string) => void;
}) => {
  const router = useRouter();

  const { name, translationName, ingredients, imageUrls, allergens } = dish;
  imageUrls?.push(require("@/assets/food/hors_doeuvres/soupe_a_loignon.webp")); // placeholder
  return (
    <View style={styles.flexColumnContainer}>
      <View style={styles.flexRowContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.translationName}>{translationName}</Text>
          <View style={styles.ingredients}>
            {ingredients &&
              ingredients.map((ingredient: string, index: number) => (
                <Text key={ingredient + index} style={styles.ingredientText}>
                  {ingredient}
                  {ingredientsDict[
                    ingredient as keyof typeof ingredientsDict
                  ] && (
                    <TouchableOpacity
                      onPress={() => {
                        setIngredientName(ingredient);
                        setOpenIngredientModal(true);
                      }}
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
        </View>
        <Image
          source={require("@/assets/food/hors_doeuvres/soupe_a_loignon.webp")} // placeholder
          style={styles.itemImage}
          resizeMode="cover"
          onError={(e) => {
            console.log("Image error:", e.nativeEvent.error);
            // You could set a state here to use a fallback image
          }}
        />
        {/* {imageUrls && imageUrls.length > 0 && (
          <Image
            source={require("@/assets/food/hors_doeuvres/soupe_a_loignon.webp")} // placeholder
            style={styles.itemImage}
            resizeMode="cover"
            onError={(e) => {
              console.log("Image error:", e.nativeEvent.error);
              // You could set a state here to use a fallback image
            }}
          />
        )} */}
      </View>

      <View style={styles.flexRowContainer}>
        {allergens && (
          <View style={styles.allergensContainer}>
            {allergens.map((allergen: string, index: number) => (
              <AllergenIcon
                key={index}
                allergen={allergen as "Gluten" | "Dairy" | "Nuts"}
                size={28}
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => router.push(`/menu/${dish.id}`)}
        >
          <Text style={styles.learnMoreText}>Learn more</Text>
          <MaterialIcons
            name="chevron-right"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexColumnContainer: {
    flexDirection: "column",
    padding: 20,
    paddingHorizontal: 33,
    gap: 10,
    width: "100%",
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemInfo: {
    flexDirection: "column",
    gap: 5,
    width: "65%",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemName: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Arial",
    lineHeight: 24,
    textAlign: "left",
  },
  translationName: {
    color: "#ffac1d",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Arial",
    lineHeight: 18,
    textAlign: "left",
    fontStyle: "italic",
    marginTop: 3,
  },
  ingredients: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    alignItems: "flex-end",
  },
  ingredientText: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: "Times New Roman",
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 2,
  },
  allergensContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  learnMoreButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 46,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 41,
  },
  learnMoreText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Arial",
    lineHeight: 21,
  },
});

export default ListDishCard;
