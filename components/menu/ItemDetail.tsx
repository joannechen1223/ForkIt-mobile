import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

import AllergenIcon from "@/components/AllergenIcon";
import FlagIcon from "@/components/FlagIcon";
import { HorizontalLine } from "@/components/ui/HorizontalLine";
import ingredientsDict from "@/data/ingredients";

const ListItemDetail = ({ item }: { item: any }) => {
  const {
    itemName,
    translationName,
    ingredients,
    imageUrls,
    allergens,
    description,
    mapping,
    newFlavor,
  } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{itemName}</Text>
      <Text style={styles.translationName}>{translationName}</Text>
      <View style={styles.ingredients}>
        {ingredients.map((ingredient: string, index: number) => (
          <Text key={ingredient + index} style={styles.ingredientText}>
            {ingredient}
            {ingredientsDict[ingredient as keyof typeof ingredientsDict] && (
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
      <ScrollView
        horizontal
        contentContainerStyle={styles.imageContainer}
        showsHorizontalScrollIndicator={false}
      >
        {imageUrls &&
          imageUrls.map((imageUrl: ImageSourcePropType, index: number) => (
            <Image key={index} source={imageUrl} style={styles.image} />
          ))}
      </ScrollView>
      <View style={styles.allergensContainer}>
        <Text style={styles.allergensTitle}>Allergens: </Text>
        {allergens.map((allergen: string) => (
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
        <Text style={styles.flavorMappingText}>{mapping}</Text>
      </View>
      <View style={styles.flavorMappingContainer}>
        <View style={styles.flavorMappingTitleContainer}>
          <FlagIcon countryCode="FR" size={20} />
          <Text style={styles.flavorMappingTitle}>What's new and exciting</Text>
        </View>
        {newFlavor && (
          <>
            {newFlavor.map((flavor: any) => (
              <Text key={flavor.name}>
                <Text
                  style={[styles.flavorMappingText, { fontWeight: "bold" }]}
                >
                  {flavor.name}
                </Text>
                <Text style={styles.flavorMappingText}>
                  {" - "}
                  {flavor.description}
                </Text>
              </Text>
            ))}
          </>
        )}
      </View>
      <HorizontalLine color="#B48B6E" />
      <TouchableOpacity style={[styles.button, { backgroundColor: "#D1CCFF" }]}>
        <Text style={styles.buttonText}>135 Reviews</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#FFFACD" }]}>
        <Text style={styles.buttonText}>Leave a Review</Text>
      </TouchableOpacity>
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
  button: {
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});

export default ListItemDetail;
