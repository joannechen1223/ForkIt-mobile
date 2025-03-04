import React from "react";
import { ScrollView, Text, StyleSheet, ImageBackground } from "react-native";

const PicScreen = () => {
  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground
        source={require("@/assets/images/menu-pic.jpg")}
        style={styles.background}
      >
        <Text style={styles.text}>
          This text is over a scrollable image background.
        </Text>
        {/* Add more content here */}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  background: {
    width: 1000,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
});

export default PicScreen;
