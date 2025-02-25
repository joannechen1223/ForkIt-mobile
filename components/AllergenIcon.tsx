import React from "react";
import { Image } from "react-native";

// Map allergen types to their image requires
const allergenImages = {
  Gluten: require("@/assets/icons/gluten.png"),
  Dairy: require("@/assets/icons/dairy.png"),
  Nuts: require("@/assets/icons/nuts.png"),
};

interface AllergenIconProps {
  allergen: "Gluten" | "Dairy" | "Nuts";
  size: number;
}

const AllergenIcon = ({ allergen, size }: AllergenIconProps) => {
  if (!allergenImages[allergen]) {
    return null;
  }

  return (
    <Image
      source={allergenImages[allergen]}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
};

export default AllergenIcon;
