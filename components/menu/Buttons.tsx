import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const HighlightButton = () => {
  return (
    <TouchableOpacity style={styles.highlightButton}>
      <MaterialIcons name="star-border" size={20} color="black" />
      <Text>Highlight</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlightButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: "#fffece",
    borderRadius: 20,
    marginRight: 10,
  },
});
