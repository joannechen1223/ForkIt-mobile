import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { MenuType } from "@/features/Menu/constants";
import { setMenuType } from "@/features/Menu/menuSlice";

const Button = ({
  icon,
  text,
  active,
  onPress,
}: {
  icon: IconSymbolName;
  text: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
    >
      <IconSymbol
        name={icon}
        size={24}
        color={active ? "#ffffff" : "#000000"}
      />
      <Text style={active && styles.activeText}>{text}</Text>
    </TouchableOpacity>
  );
};

const TopBar = ({ menuType }: { menuType: string }) => {
  const dispatch = useDispatch();

  const handleButtonPress = (menuType: string) => {
    dispatch(setMenuType(menuType));
  };

  return (
    <View style={styles.container}>
      <Button
        icon="message"
        text="Ask"
        active={menuType === MenuType.Ask}
        onPress={() => handleButtonPress(MenuType.Ask)}
      />
      <Button
        icon="doc.text"
        text="List"
        active={menuType === MenuType.List}
        onPress={() => handleButtonPress(MenuType.List)}
      />
      <Button
        icon="photo"
        text="Pic"
        active={menuType === MenuType.Pic}
        onPress={() => handleButtonPress(MenuType.Pic)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    left: 24,
    right: 24,
    flexDirection: "row",
    height: 64,
    borderRadius: 66,
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1000,
    backgroundColor: "#f9f7ec",
  },
  button: {
    backgroundColor: "transparent",
    width: 97,
    height: 54,
    borderRadius: 47,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  activeButton: {
    backgroundColor: "#000000",
  },
  activeText: {
    color: "#ffffff",
  },
});

export default TopBar;
