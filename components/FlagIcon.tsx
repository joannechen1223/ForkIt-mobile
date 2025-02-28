import React from "react";
import { Image } from "react-native";

// Map allergen types to their image requires
const flagImages = {
  FR: require("@/assets/flags/fr.png"),
  US: require("@/assets/flags/us.png"),
};

interface FlagIconProps {
  countryCode: "FR" | "US";
  size: number;
}

const FlagIcon = ({ countryCode, size = 12 }: FlagIconProps) => {
  if (!flagImages[countryCode]) {
    return null;
  }

  return (
    <Image
      source={flagImages[countryCode]}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
};

export default FlagIcon;
