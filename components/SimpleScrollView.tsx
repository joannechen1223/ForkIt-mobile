import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, StyleProp, ViewStyle } from "react-native";

export default function SimpleScrollView({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView contentContainerStyle={[styles.container, style]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    alignItems: "center",
  },
});
