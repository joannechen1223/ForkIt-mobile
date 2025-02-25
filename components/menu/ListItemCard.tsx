import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AllergenIcon from "@/components/AllergenIcon";
import ingredientsDict from "@/data/ingredients";

const ListItemCard = ({ item }: { item: any }) => {
  const { itemName, translationName, ingredients, imageUrls, allergens } = item;
  return (
    <View style={styles.flexColumnContainer}>
      <View style={styles.flexRowContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{itemName}</Text>
          <Text style={styles.translationName}>{translationName}</Text>
          <View style={styles.ingredients}>
            {ingredients.map((ingredient: string, index: number) => (
              <Text key={ingredient + index} style={styles.ingredientText}>
                {ingredient}
                {ingredientsDict[
                  ingredient as keyof typeof ingredientsDict
                ] && (
                  <TouchableOpacity>
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
        {imageUrls && imageUrls.length > 0 && (
          <Image
            source={imageUrls[0]}
            style={styles.itemImage}
            resizeMode="cover"
            onError={(e) => {
              console.log("Image error:", e.nativeEvent.error);
              // You could set a state here to use a fallback image
            }}
          />
        )}
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

        <TouchableOpacity style={styles.learnMoreButton} onPress={() => {}}>
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

export default ListItemCard;
