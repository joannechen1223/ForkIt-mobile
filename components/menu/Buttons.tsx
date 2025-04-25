import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setHighlight } from "@/features/Menu/menuSlice";

export const HighlightButton = ({ dishId }: { dishId: number }) => {
  const dispatch = useDispatch();
  const highlight = useSelector(
    (state: any) => state.menu.dishes[dishId].highlight,
  );
  return (
    <TouchableOpacity
      style={[
        styles.highlightButton,
        { backgroundColor: highlight ? "#000000" : "#fffece" },
      ]}
      onPress={() => dispatch(setHighlight({ dishId, highlight: !highlight }))}
    >
      <MaterialIcons
        name={highlight ? "star" : "star-border"}
        size={20}
        color={highlight ? "#fffece" : "black"}
      />
      <Text style={{ color: highlight ? "#fffece" : "black" }}>
        {highlight ? "Highlighted" : "Highlight"}
      </Text>
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
